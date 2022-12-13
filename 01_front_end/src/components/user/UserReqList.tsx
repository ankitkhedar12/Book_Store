import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserNavigation from './UserNavigation';
import { IRequest } from '../../interfaces/Interface';
import '../signup/Signup';
import '../admin/usersList/userlist.css';

function UserReqList() {
  const navigate = useNavigate();

  const[value,setvalue]=useState<IRequest[]>([]);
  useEffect(  () => {
    getData();
    }, []);
  

    const getData=async ()=>{
      await axios({
        method: "get",
        url: "http://localhost:5001/api/userrequestslist",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        // body: localStorage.getItem("_id")
      }).then((res)=> {
        console.log("User ReqList: ",res);
        setvalue(res.data);
      });
    }
      async function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        navigate('/signin')  ;  
      }
  return (
    <div>  
      {/* <h2 className='baskerville'>Admin Panel</h2> */}
      <UserNavigation /> 
      <h2>Requests</h2>
      <table className='blue'>
        <thead>
          <tr>
            {/* <th>User</th> */}
            <th>Book</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        { value.map((item,index)=>{
          return(
        <tbody>
          <tr>
            {/* <td>{value[index]?.user_name}</td> */}
            <td >{value[index]?.book_name}</td>
            <td>{value[index]?.status}</td>
            <td>{value[index]?.from_date}</td>
            <td>{value[index]?.to_date}</td>
          </tr>
        </tbody>
          )
        })
      }
      </table>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
export default UserReqList;
