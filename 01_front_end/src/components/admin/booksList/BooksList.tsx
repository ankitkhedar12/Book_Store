import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import AdminNavigation from '../AdminNavigation';
import { useSelector, useDispatch } from "react-redux";
import '../../signup/Signup.css';
import '../usersList/userlist.css'
import { IBook } from '../../../interfaces/Interface';
import { loginAction } from '../../../redux/actions';

const BooksList=()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[value,setValue]=useState<IBook[]>([]);
  const userIsLoggedIn: boolean = useSelector((state: any) => state.user.isLoggedIn);

  useEffect(  () => {
    getData();
    }, []);
    
    /** Calling API to get list of Books */
    const getData=async ()=>{
      await axios({
        method: "get",
        url: "http://localhost:5001/api/admin/books",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res)=> {
        console.log("Admin Profile Response",res);
        setValue(res.data);
      });
    }

    /** API to delete book through button click */
    async function deleteBook(id: string){
      console.log("DeleteBook Id",id)
      await axios({
        method: "post",
        // url: `http://localhost:5001/api/deletebooks?id=${id}`,
        url: `http://localhost:5001/api/deletebooks`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { bookId: id }
      })
      getData();
    }

    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      console.log("Booklist 123: ", userIsLoggedIn);
      dispatch(loginAction(false));
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