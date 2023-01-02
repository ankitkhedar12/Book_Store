import { FunctionComponent, useState, useEffect } from 'react';   
// import jwt_decode from "jwt-decode";
import { Navigate, Route, useLocation } from "react-router-dom";
// import { IDecodedToken } from "../interfaces/Interface";

export function PrivateRouteLogic({ children }:any) {  
  const [isLoggedIn, setLoggedIn ] =useState(false);

  const accessToken = () => localStorage.getItem("token") as string;
  // const decodedToken: IDecodedToken = jwt_decode(accessToken);
  async function SetLoggedIn() {
    console.log("token", accessToken());
    if(accessToken()){
      await setLoggedIn(true);
      console.log("Inside UseEffect: : : ", isLoggedIn);
    }
  }
  useEffect(()=>{
    SetLoggedIn();
  },[])

  //  if (decodedToken.role === 'admin') {
  //   history.push("/admin-panel");
  //  }

   return isLoggedIn ? children : <Navigate to="/signin" />
//   return children;  
};