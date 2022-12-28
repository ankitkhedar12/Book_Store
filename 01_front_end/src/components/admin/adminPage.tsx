// import AdminNavigation from "./AdminNavigation";
import UsersList from './usersList/UsersList';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const location = useLocation();
  const[count, setCount] = useState(0);

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
  function loginNotification(){
    if(location.state.fromSignup === true){
      adminNotify();
    }
  }

  useEffect(()=>{
    console.log("Location: ", location.state)
    if(count === 0){
      loginNotification();
      setCount(count+1);
    }
  },[])
  return (
    <div className="App">
      <UsersList/>
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
  );
}