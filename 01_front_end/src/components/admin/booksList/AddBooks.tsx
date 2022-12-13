import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import AdminNavigation from '../AdminNavigation';
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import '../../signup/Signup.css';
import '../usersList/userlist.css'
import { IBook } from '../../../interfaces/Interface';

const schema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required()
  }).required();

const AddBook=()=> {
    const { register, handleSubmit } = useForm<IBook>({
        resolver: yupResolver(schema), 
      });
    const navigate = useNavigate();

    const errorNotify = () => {
        toast('Book Already Exist. or Updated quantity', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    };

    const bookExistnotify = () => {
        toast('🦄 Book Added', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    };

    const onSubmit = handleSubmit(async (data) => {
      await axios({
        method: "post",
        url: "http://localhost:5001/api/addbooks",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        data: data,
      }).then((res)=> {
        console.log("Admin Profile Response",res);
        // setValue(res.data);
        if(res.data.value === 1){
          console.log(res.data.value)
            errorNotify();
        }else{
            bookExistnotify();
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
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    </div>
  )
}
export default AddBook;