import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { IBook } from '../../interfaces/Interface';
import { notify } from '../../constants/notifications';
import UserNavigation from './UserNavigation';
import '../../App.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { AdminConstants } from '../../constants/Constants';

function UserProfile() {
  const { register, handleSubmit } = useForm()
  const [searchvalue, setSearchValue] = useState<string>('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const navigate = useNavigate();

  const[value,setValue]=useState<IBook[]>([]);
  useEffect(  () => {
    getData();
    }, [searchvalue]);

    const onSubmit = handleSubmit(async (info) => {
      console.log("Form Data:",info);
      setSearchValue(info.search);
    });

    /** Calling API to Search Books */
    const getData=async ()=>{
    await axios({
          method: "post",
          url: "http://localhost:5001/api/user/searchbook",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          data: { searchValue: searchvalue }
        }).then((res)=> {
          console.log("UserProfile Response",res);
          setValue(res.data);
          console.log("SearchValue",searchvalue)
        });
      }

      /** Calling API to Issue */
    async function requestBook(bookid: any){
      await axios({
        method: "post",
        url: `http://localhost:5001/api/issuebook`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { book_id: bookid, status: AdminConstants.STATUS, from_date: startDate , to_date: endDate },
      }).then((res) => {
        // console.log("UserProfile BookRes",res);
          switch(res.data.msg){
            case "Book Requested":
              notify('Book Requested');
              break;
            case "Date_not_selected":
              notify('Please Select Date');
              break;
            case "Request Exists":
              notify("You can't add same book more than 1");
              break;
            case "Book not available":
              notify("Book not available");
              break;
            case "Issue Date cannot be in past":
              notify("Issue Date cannot be in past");
              break;
            default: 
              console.log("Error in issueBook api calling");
          }
});
      getData();
    }
    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("_id");
      navigate('/signin')  ;  
    }

    /** Setting date states from datepicker */
    const onDateChange = (dates:any) => {
      const [start, end] = dates;
      console.log("Start: ", start, "End: ", end);
      setStartDate(start);
      setEndDate(end);
    };

  return (
    <div className="">
      <UserNavigation />
      <h2>Books List</h2>
      <form className='userform'  onSubmit={onSubmit}>
          <input {...register("search")} className='search' type="text" style={{textAlign: 'center'}} placeholder='Search' name="search" id="search" />
          <button type='submit' className='buttonSearch' > Search </button>
      </form>

      {/* <div className='datebox'> */}
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={onDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          placeholderText="From Date"
          closeOnScroll={true}
          className = 'red-border'
          // excludeDates={[new Date(), subDays(new Date(), 1)]}
          // minDate={new Date()}
          // maxDate={(new Date(), 365)}
        />
      {/* </div> */}
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
            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => requestBook(value[index]?._id)} >Request</button></td>
          </tr>
        </tbody>
          )
        })
      }
      </table>
      
      <button onClick={logout}>Logout</button>
      <ToastContainer />
    </div>
  );
}

export default UserProfile;