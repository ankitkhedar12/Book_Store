import { useEffect } from 'react';     
// import jwt_decode from "jwt-decode";
import { isExpired } from "react-jwt";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export function PrivateRouteLogic({ children }:any){
  let token: string = localStorage.getItem("token")!;
  const isMyTokenExpired = isExpired(token);
  const userIsLoggedIn: boolean = useSelector((state: any) => state.user.isLoggedIn);
  /**  const accessToken = () => localStorage.getItem("token") as string;
  * const decodedToken: IDecodedToken = jwt_decode(accessToken);  
  * */
  useEffect(() => {
    console.log("UserIsLoggedIn: ", userIsLoggedIn);
    token = localStorage.getItem("token")!;
  }, [isMyTokenExpired]);
   return (token) ? children : <Navigate to="/signin" />
};