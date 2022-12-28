import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Navbar } from '../navigationBar/Navbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { Inputs } from '../../interfaces/Interface';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'
import * as yup from "yup";
 
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Signup () {
  const userExistnotify = () => {
    toast('🦄 User Already Exist. Please Login', {
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
  const loginNotify = () => {
    toast('Please Login', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:5001/api/signup", {...data, role: 'user', status: 'active'});

    console.log("Signup Res: ", res);

    switch(res.data.msg){
      case "User Already Exist. Please Signin":
        userExistnotify();
        break;
      case "Please Login":
        loginNotify();
        navigate("/signin", {state:{fromSignup: true}});
        break;
      default:
        console.log("Something went wrong in SigningUp");
    }
  });
  return (
    <>
    <Navbar />
    <h2 className='baskerville'>Signup</h2>
      <form onSubmit={onSubmit}>
        <input {...register("name")} placeholder="Name" />
        <input type="email" {...register("email")} placeholder="Email" />
        <input type="text" {...register("password")} placeholder="************" />
        <button type='submit'>Register</button> 
        <button onClick={()=> {navigate("/signin")}}>SignIn</button>
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
      </form>
      
    </>
  );
};