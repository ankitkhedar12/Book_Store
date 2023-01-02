import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios, { AxiosResponse } from 'axios'
import { FormValues } from '../../interfaces/Interface';
import { Navbar } from '../navigationBar/Navbar';
import { useSelector, useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import '../signup/Signup.css'
import { adminNotify } from '../../constants/notifications';
import { loginAction } from '../../redux/actions';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Login() {
  const isLoggedIn: boolean = useSelector((state: any) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema),  })

  /** On Form Submit, calling Login API */
  const onSubmit = handleSubmit(async (info) => {
    const res: AxiosResponse<any, any> = await axios.post("http://localhost:5001/api/signin", info)
    switch(res.data.msg){
      case "Welcome Back":
        console.log("LoginResponse :",res);
        adminNotify("Welcome Back");
        localStorage.setItem('token', res.data.token);
        setTimeout(()=>navigate('/userprofile'),1000)
        break;
      case "User not registered":
        adminNotify('User not registered!');
        break;
      case "User is Deactivated":
        adminNotify('Your account has been deactivated by Admin');
        break;
      case "Invalid Credentials":
        adminNotify('Invalid Credentials!');
        break;
      case "Admin Login":
        console.log("Login 123: ", isLoggedIn);
        dispatch(loginAction(true));
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isLoggedIn', String(isLoggedIn));
        navigate("/admin", {state:{fromSignup: true}})
        break;
      default: 
        console.log("Error");
    }
  });
  return (
    <>
      <Navbar />
      <h2 className='baskerville'>Signin</h2>
      <form onSubmit={onSubmit}>
        <input {...register("email")} placeholder="Email" />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <input type="password" {...register("password")} placeholder="**************" />
        <div className="invalid-feedback">{errors.password?.message}</div>
        <button type='submit'>Login</button>
      </form>
      <button>Forget Password</button>
        <ToastContainer />
    </>
  );
}
