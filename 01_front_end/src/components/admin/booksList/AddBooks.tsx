import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import AdminNavigation from '../AdminNavigation';
import * as yup from "yup";
import { IBook } from '../../../interfaces/Interface';
import { adminNotify } from '../../../constants/notifications';

const schema = yup.object().shape({
    title: yup.string().min(2, "Minium 2 character are required").required(),
    author: yup.string().max(35, "Max 35 characters").required(),
    price: yup.number().required(),
    quantity: yup.number().required()
  }).required();

const AddBook=()=> {
    const { register, handleSubmit } = useForm<IBook>({
        resolver: yupResolver(schema), 
      });
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
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
  return (
    <div>  
      <h2 className='baskerville'>Admin Panel</h2>
      <AdminNavigation /> 
      <form onSubmit={onSubmit}>
        <input type="text" {...register("title")} placeholder="Title" />
        <input type="text" {...register("author")} placeholder="Author" />
        <input type="number" {...register("price")} placeholder="Price" />
        <input type='' {...register("quantity")} placeholder="Quantity" />
        <button type='submit'>Add Books</button> 
        <button onClick={()=> {navigate('/admin/books')}}>All Books</button>
      </form>
      <ToastContainer />
    </div>
  )
}
export default AddBook;