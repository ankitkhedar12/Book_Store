import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AdminNavigation from '../AdminNavigation';
import { IUser } from '../../../interfaces/Interface';
import '../../signup/Signup.css';
import './userlist.css'

const UsersList=()=> {
  const navigate = useNavigate();
  const[value,setValue]=useState<IUser[]>([]);
  useEffect(  () => {
    getData();
    }, []);
  

    const getData=async ()=>{
      await axios({
        method: "get",
        url: "http://localhost:5001/api/userslist",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        // body: localStorage.getItem("_id")
      }).then((res)=> {
        console.log("Admin Profile Users Response",res);
        setValue(res.data);
      });
    }
  
  async function activateUser (id:string) {

    await axios({
      method: "put",
      url: `http://localhost:5001/api/admin/edituserstatus?id=${id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { status: 'Active'},
    }).then((res)=> {
      getData();
    });
  }

  async function deactivateUser (id:string) {
    await axios({
      method: "put",
      url: `http://localhost:5001/api/admin/edituserstatus?id=${id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { status: 'Deactivated'},
    }).then((res)=> {
      getData();
    });
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
      <h2>UsersList</h2>
      <table className='blue'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        { value.map((item,index)=>{
          return(
        <tbody>
          <tr>
            <td>{value[index]?.name}</td>
            <td className='email'>{value[index]?.email}</td>
            <td> { item.status } </td>
            <td>
            <button onClick={(e: React.SyntheticEvent<EventTarget>) => activateUser(value[index]?._id)} > Activate </button>
              <button onClick={(e: React.SyntheticEvent<EventTarget>) => deactivateUser(value[index]?._id)} > Deactivate </button>
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
export default UsersList;










// export default function UsersList() {
// //   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver })
// const [value, setValue] = useState<IUser[]>([])
// useEffect(()=> 
// {
//     onSubmit();
// },[])

//   const onSubmit = async () => {
//     const res = await axios.get("http://localhost:5001/api/userslist");
//     setValue(res.data)
//     console.log("Data", res.data);
//   }

//   console.log("value", value);
  
//   return (
//     <>
//         <AdminNavigation/>
//         {/* { tableRows} */}
//         {/* {onSubmit} */}
//         {
//             value.map(
//                 (element:IUser )=>(
//                                 <tr>
//                                 <td>{element.email}</td>
//                                 <td>{element.name}</td>
//                                 <td>{element.password}</td>
//                                 <td>{element.role}</td>
//                             </tr>
//                     )
//             )
//             }
//     </>
//   );
// }










// import AdminNavigation from "./AdminNavigation";
// import axios, { AxiosResponse } from "axios";
// import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
// import usePromise from "react-promise";

// interface IUser{
//     name: string,
//     email: string,
//     password: string,
//     role: string
// }
// interface IList{
//     loading:boolean,
//     erroe: Error | null,
//     value:IUser[]
// }
// export default async function UsersList() {
//     // const {loading, error, value} = usePromise<IList>(async ()=> {
//     //     const res: AxiosResponse<any, any> = await axios.get("http://localhost:5001/api/userslist");
//     //     return res.data;
//     //     // onSubmit();
//     // })
//     // const [value, setValue] = useState<IUser[]>()
//     let tableRows ;
//     useEffect( ()=> {
//         // setValue(await axios.get("http://localhost:5001/api/userslist"));
//         onSubmit();
//     },[])
//     async function onSubmit  () {
//         const res: AxiosResponse<any, any> = await axios.get("http://localhost:5001/api/userslist");
//         // setValue(res.data)
//         // notify()
//         console.log("Response", res.data);
//         tableData(res.data);
//       }
//       function tableData(data:IUser[]){
//         tableRows = data.map(
//             (element: { email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; password: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; role: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; })=>{
//                 return(
//                          <tr>
//                             <td>{element.email}</td>
//                             <td>{element.name}</td>
//                             <td>{element.password}</td>
//                             <td>{element.role}</td>
//                         </tr>
//                 )
//             }
//         )
//       }

      
//   return (
//     <div className="App">
//       <AdminNavigation />
//       <header className="App-header">
//         {/* users */}
//         {/* {value} */}
//         <table>
//             <tr>
//                 <td>Email</td>
//                 <td>name</td>
//                 <td>Password</td>
//                 <td>Role</td>
//             </tr> 
//             {tableRows}
// 		</table>
//         {/* <onSubmit /> */}
//       </header>
//     </div>
//   );
// }