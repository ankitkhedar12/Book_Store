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
import { loginNotify } from '../../constants/notifications';
 
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Signup () {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:5001/api/signup", {...data, role: 'user', status: 'Active'});

    console.log("Signup Res: ", res);

    switch(res.data.msg){
      case "User Already Exist. Please Signin":
        loginNotify('User Already Exist. Please Login');
        break;
      case "Please Login":
        loginNotify('Please Login');
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
        <div className="invalid-feedback">{errors.name?.message}</div>
        <input type="email" {...register("email")} placeholder="Email" />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <input type="password" {...register("password")} placeholder="************" />
        <div className="invalid-feedback">{errors.password?.message}</div>
        <button type='submit'>Register</button> 
        <button onClick={()=> {navigate("/signin")}}>SignIn</button>
        <ToastContainer />
      </form>
      
    </>
  );
};