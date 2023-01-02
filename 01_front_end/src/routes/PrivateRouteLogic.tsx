
import { FunctionComponent, useEffect } from 'react';     
// import jwt_decode from "jwt-decode";
import { isExpired } from "react-jwt";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export function PrivateRouteLogic({ children }:any){
  let token: string = localStorage.getItem("token")!;
  const isMyTokenExpired = isExpired(token);
  const userIsLoggedIn: boolean = useSelector((state: any) => state.user.isLoggedIn);
  // const accessToken = () => localStorage.getItem("token") as string;
  // // const decodedToken: IDecodedToken = jwt_decode(accessToken);
  useEffect(() => {
    token = localStorage.getItem("token")!;
  }, [isMyTokenExpired]);
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
   return (userIsLoggedIn) ? children : <Navigate to="/signin" />
};