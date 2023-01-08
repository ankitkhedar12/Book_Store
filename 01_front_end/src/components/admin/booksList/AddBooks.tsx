import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import AdminNavigation from '../AdminNavigation';
import * as yup from "yup";
import '../../signup/Signup.css';
import { IBook, IFormInputs } from '../../../interfaces/Interface';
import { adminNotify } from '../../../constants/notifications';

const schema = yup.object().shape({
    title: yup.string().min(2, "Minium 2 character").max(35, "Max 35 characters").required('Required'),
    author: yup.string().min(2, "Minium 2 character").max(35, "Max 35 characters").required('Required'),
    price: yup.number().required('Required'),
    quantity: yup.number().required('Required')
  }).required();

const AddBook=()=> {
    const { register, handleSubmit, formState: {errors} } = useForm<IBook>({
        resolver: yupResolver(schema),
      });
    const navigate = useNavigate();

    /** OnSubmit Calling API to add book */
    const onSubmit: SubmitHandler<IFormInputs> =(async (data) => {
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      console.log("Picture: ", input);

        const file = input.files![0];
        const base64 = await convertToBase64(file)
        console.log("Base64: ", base64);


      await axios({
        method: "post",
        url: "http://localhost:5001/api/addbooks",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: data,
      }).then((res)=> {
        console.log("AddBooks Response",res);
        switch(res.data.msg){
          case "Book Already Exist":
            adminNotify('Book Already Exist.')
            break;
          case "Book Added":
            adminNotify('Book Added')
            break;
          default:
            console.log("Error while adding Books")
        }
      });
    });

    /** Function to convert images to base64 */
    const convertToBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
  return (
    <div>  
      <h2 className='baskerville'>Admin Panel</h2>
      <AdminNavigation /> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} placeholder="Title"  />
        <div className="invalid-feedback">{errors.title?.message}</div>
        <input type="text" {...register("author")} placeholder="Author" className={`form-control ${errors.author ? 'is-invalid' : ''}`}  />
        <div className="invalid-feedback">{errors.author?.message}</div>
        <input 
          type="number" 
          {...register("price", { required: true, maxLength: 5 })} 
          aria-invalid={errors.price ? "true" : "false"}  
          placeholder="Price" 
          className={`form-control ${errors.price ? 'is-invalid' : ''}`} 
        />
        <div className="invalid-feedback">{errors.price && "Required"}</div>
        <input 
          type='number' 
          {...register("quantity", { required: true, maxLength: 5 })} 
          placeholder="Quantity" 
          className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} 
        />
        <div className="invalid-feedback">{errors.quantity && "Required"}</div>
        <input type="file" {...register("picture")} placeholder="Picture" />
        <button type='submit'>Add Books</button> 
        <button onClick={()=> {navigate('/admin/books')}}>All Books</button>
      </form>
      <ToastContainer />
    </div>
  )
}
export default AddBook;