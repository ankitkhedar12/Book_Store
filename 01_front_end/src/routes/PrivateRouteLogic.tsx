import { FunctionComponent, useState, useEffect } from 'react';   
// import { PrivateRouteProps } from "src/root/routing/interfaces/PrivateRouteProps";  
import jwt_decode from "jwt-decode";
import { Navigate, Route, useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { IDecodedToken } from "../interfaces/Interface";

export function PrivateRouteLogic({ children }:any) {  
  // const dispatch = useDispatch();
  // const [isLoggedIn, setLoggedIn ] =useState(false);
  // const IsLoggedIn = useSelector((state: any) => state.count.value);

  const accessToken = () => localStorage.getItem("token") as string;
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  // const decodedToken: IDecodedToken = jwt_decode(accessToken);
  async function SetLoggedIn() {
    console.log("token", accessToken());
    if(accessToken()){
      // await setLoggedIn(true);
      console.log("Inside UseEffect: : : ", isLoggedIn);
    }
  }
  useEffect(()=>{
    SetLoggedIn();
  },[])

  //  if (decodedToken.role === 'admin') {
  //   history.push("/admin-panel");
  //  }

   return (isLoggedIn === 'true') ? children : <Navigate to="/signin" />
//   return children;  
};