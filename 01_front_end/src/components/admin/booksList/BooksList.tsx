import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import AdminNavigation from '../AdminNavigation';
import '../../signup/Signup.css';
import '../usersList/userlist.css'
import { IBook } from '../../../interfaces/Interface';

const BooksList=()=> {

  const navigate = useNavigate();

  const[value,setValue]=useState<IBook[]>([]);
  useEffect(  () => {
    getData();
    }, []);
  

    const getData=async ()=>{
      await axios({
        method: "get",
        url: "http://localhost:5001/api/admin/books",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        // body: localStorage.getItem("_id")
      }).then((res)=> {
        console.log("Admin Profile Response",res);
        setValue(res.data);
      });
    }
    async function deleteBook(id: string){
      console.log("DeleteBook Id",id)
      await axios({
        method: "post",
        url: `http://localhost:5001/api/deletebooks?id=${id}`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        // body: localStorage.getItem("_id")
      })
      getData();
    }
    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("_id");
      navigate('/signin')  ;  
    }

  return (
    <div>  
      <h2 className='baskerville'>Admin Panel</h2>
      <AdminNavigation /> 
      <h2>Books List</h2>
      <button onClick={(e: React.SyntheticEvent<EventTarget>) => navigate('/admin/addBook')} >Add Books</button>
      <table className='blue'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        { value.map((item,index)=>{
          return(
        <tbody>
          <tr>
            <td>{value[index]?.title}</td>
            <td >{value[index]?.author}</td>
            <td>{value[index]?.price}</td>
            <td>{value[index]?.quantity}</td>
            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => deleteBook(value[index]?._id)} >Delete</button></td>
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
export default BooksList;
