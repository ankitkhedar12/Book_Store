// import AdminNavigation from "./AdminNavigation";
import UsersList from './usersList/UsersList';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastButton } from '../notificationPopup';
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
      {/* <ToastButton message='Hello World!' /> */}
      <ToastContainer />
    </div>
  );
}