import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AdminNavigation from '../AdminNavigation';
import { IRequest } from '../../../interfaces/Interface';
import '../../signup/Signup.css';
import '../usersList/userlist.css'

function ReqList() {
  const navigate = useNavigate();

  const[value,setvalue]=useState<IRequest[]>([]);
  useEffect(  () => {
    getData();
    }, []);
  

    const getData=async ()=>{
      await axios({
        method: "get",
        url: "http://localhost:5001/api/requestslist",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        // body: localStorage.getItem("_id")
      }).then((res)=> {
        console.log("Admin Profile Response",res);
        setvalue(res.data);
      });
    }
    async function acceptReq (id:string) {

      await axios({
        method: "put",
        url: `http://localhost:5001/api/editstatus`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        data: { status: 'Accepted', bookId: id},
      }).then((res)=> {
        getData();
      });
    }
    async function rejectReq (id:string) {
      await axios({
        method: "put",
        url: `http://localhost:5001/api/editstatus?id=${id}`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        data: { status: 'Rejected'},
      }).then((res)=> {
        getData();
      });
 }
      async function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        navigate('/signin')  ;  
      }
  return (
    <div>  
      <h2 className='baskerville'>Admin Panel</h2>
      <AdminNavigation /> 
      <h2>Requests</h2>
      <table className='blue'>
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th></th>
          </tr>
        </thead>
        { value.map((item,index)=>{
          return(
        <tbody>
          <tr>
            <td>{value[index]?.user_name}</td>
            <td >{value[index]?.book_name}</td>
            <td>{value[index]?.status}</td>
            <td>{value[index]?.from_date}</td>
            <td>{value[index]?.to_date}</td>
            <td>
              <button onClick={(e: React.SyntheticEvent<EventTarget>) => acceptReq(value[index]?._id)} > Accept </button>
              <button onClick={(e: React.SyntheticEvent<EventTarget>) => rejectReq(value[index]?._id)} > Reject </button>
            </td>
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
export default ReqList;
