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
  const notifya = () => {
    toast('Email not found!', {
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
  const adminNotify = () => {
    toast('Namestey Admin ´◡`', {
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
    // .then((res)=> console.log(res));
    // console.log("res",res);
    if(res.data.value === 1){
    console.log("LoginRes",res);
    // console.log("token", res.data.token);
    // console.log("id", res.data.user._id);
      notify();
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('_id', res.data.user._id);
      setTimeout(()=>navigate('/userprofile'),1300)
    }
    if(res.data.value === 2){
      notifya();
    }
    if(res.data.value === 3){
      invalid();
    }
    if(res.data.value === 4){
      inactive();
    }
    if(res.data.value === 5){
      adminNotify();
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('_id', res.data.user._id);
      setTimeout(()=> navigate("/admin"), 1300)
    }
    // notify()
    // console.log(info,"Response", res);
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
