import { useForm, Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios, { AxiosResponse } from 'axios'
import { FormValues } from '../../interfaces/Interface';
import { Navbar } from '../navigationBar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import '../signup/Signup.css'
import { adminNotify } from '../../constants/notifications';

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

export default function Login() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver })

  /** On Form Submit calling Login API */
  const onSubmit = handleSubmit(async (info) => {
    // const { email, password } = info;
    // dispatch(authActions.login({ username, password }));
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
        localStorage.setItem('token', res.data.token);
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
        {errors?.email && <p>{errors.email.message}</p>}
        
        <input type="password" {...register("password")} placeholder="**************" />
        <button type='submit'>Login</button>
      </form>
      <button>Forget Password</button>
        <ToastContainer />
    </>
  );
}
