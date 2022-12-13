import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import logo from '../../logo.svg';
import UserNavigation from './UserNavigation';
import { IBook } from '../../interfaces/Interface';
import '../../App.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

function UserProfile() {
  const { register, handleSubmit } = useForm()
  const [searchvalue, setSearchValue] = useState<string>('');
  const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
  // const [val, onChange] = useState(new Date());
  const navigate = useNavigate();
  const notify = () => {
    toast.success('Book Requested', {
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
  const fromdatenotify = () => {
    toast.warn('Please Select From Date', {
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
  const enddatenotify = () => {
    toast.warn('Please Select End Date', {
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
  const bookquantitynotify = () => {
    toast.warn('Book not available', {
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
  const issueerrornotify = () => {
    toast.warn("You can't add same book more than 1", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const[value,setValue]=useState<IBook[]>([]);
  useEffect(  () => {
    getData();
    // console.log("Date",val);
    console.log("StartDate", startDate);
    console.log("EndDate", endDate);
    }, [searchvalue]);

    const onSubmit = handleSubmit(async (info) => {
      console.log("Form Data:",info);
      setSearchValue(info.search);
    });

    const getData=async ()=>{
    await axios({
          method: "post",
          url: "http://localhost:5001/api/user/searchbook",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
          data: { searchvalue: searchvalue }
        }).then((res)=> {
          console.log("UserProfile Response",res);
          setValue(res.data);
          console.log("SearchValue",searchvalue)
        });
      }

    async function requestBook(bookid: any){
      await axios({
        method: "post",
        url: `http://localhost:5001/api/issuebook`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
        data: {user_id: localStorage.getItem('_id'), book_id: bookid, status: 'Pending', from_date: startDate , to_date: endDate },
      }).then((res) => {
        console.log("BookRes",res);
        if(res.data.value === 1){
            notify();
          }
        if(res.data.value === 2){
            fromdatenotify();
          }
        if(res.data.value === 3){
            enddatenotify();
          }
        if(res.data.value === 4){
            bookquantitynotify();
          }
        if(res.data.value === 5){
            issueerrornotify();
          }
});
      getData();
    }
    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("_id");
      navigate('/signin')  ;  
    }
  return (
    <div className="">
      <UserNavigation />
      <h2>Books List</h2>
      <form className='userform'  onSubmit={onSubmit}>
          <input {...register("search")} className='search' type="text" style={{textAlign: 'center'}} placeholder='Search' name="search" id="search" />
          <button type='submit' className='buttonSearch' > Search </button>
      </form>
      <div className='datebox'>
        <div className='date1'>
            <DatePicker 
                selected={startDate}
                onChange={(date:any) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                // isClearable={true}
                placeholderText="From Date"
                closeOnScroll={true}
                className = 'red-border'
            />
        </div>
        <div className='date2'>
          <DatePicker
              selected={endDate}
              onChange={(date:any) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              // isClearable={true}
              placeholderText="To Date"
              closeOnScroll={true}
          />
        </div>
      </div>
      <table className='blue'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            {/* <th>From</th>
            <th>To</th> */}
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
            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => requestBook(value[index]?._id)} >Request</button></td>
          </tr>
        </tbody>
          )
        })
      }
      </table>
      
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <button onClick={logout}>Logout</button>
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

export default UserProfile;