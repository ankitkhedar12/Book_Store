import { useForm, Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios'
import { FormValues } from '../../interfaces/Interface';
import { Navbar } from '../navigationBar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import '../signup/Signup.css'

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
  const notify = () => {
    toast.success('Welcome Back', {
      position: "top-center",
      autoClose: 1100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const userNotFound = () => {
    toast('User not registered!', {
      position: "top-center",
      autoClose: 1100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const invalid = () => {
    toast('Invalid Credentials!', {
      position: "top-center",
      autoClose: 1100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const inactive = () => {
    toast('Your account has been deactivated by Admin', {
      position: "top-center",
      autoClose: 1100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver })
  const onSubmit = handleSubmit(async (info) => {
    console.log("Info:",info)
    const res: AxiosResponse<any, any> = await axios.post("http://localhost:5001/api/signin", info)
    
    switch(res.data.msg){
      case "Welcome Back":
        console.log("LoginResponse :",res);
        notify();
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('_id', res.data.user._id);
        setTimeout(()=>navigate('/userprofile'),1000)
        break;
      case "User not registered":
        userNotFound();
        break;
      case "User is Deactivated":
        inactive();
        break;
      case "Invalid Credentials":
        invalid();
        break;
      case "Admin Login":
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('_id', res.data.user._id);
        navigate("/admin", {state:{fromSignup: true}})
        break;
      default: 
        console.log("Error")
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
      {/* <button>Forget Password</button> */}
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
    </>
  );
}
