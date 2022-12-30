// import AdminNavigation from "./AdminNavigation";
import UsersList from './usersList/UsersList';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { adminNotify } from '../../constants/notifications';

export default function Admin() {
  const location = useLocation();

  useEffect(()=>{
    console.log("Location: ", location.state)
    adminNotify('Namestey Admin ´◡`');
  },[])
  return (
    <div className="App">
      <UsersList/>
      <ToastContainer />
    </div>
  );
}