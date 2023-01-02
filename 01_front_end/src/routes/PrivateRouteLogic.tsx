import { FunctionComponent, useEffect } from 'react';   
// import { PrivateRouteProps } from "src/root/routing/interfaces/PrivateRouteProps";  
// import jwt_decode from "jwt-decode";
import { isExpired } from "react-jwt";
import { Navigate, Route, useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { IDecodedToken } from "../interfaces/Interface";

export function PrivateRouteLogic({ children }:any){  
  // const dispatch = useDispatch();
  // const [isLoggedIn, setLoggedIn ] =useState(false);
  // const IsLoggedIn = useSelector((state: any) => state.count.value);
  let token: string = localStorage.getItem("token")!;
  const isMyTokenExpired = isExpired(token);
  // const accessToken = () => localStorage.getItem("token") as string;
  // const isLoggedIn = localStorage.getItem('isLoggedIn')
  // // const decodedToken: IDecodedToken = jwt_decode(accessToken);
  // async function SetLoggedIn() {
  //   console.log("token", accessToken());
  //   if(accessToken()){
  //     // await setLoggedIn(true);
  //     console.log("Inside UseEffect: : : ", isLoggedIn);
  //   }
  // }
  useEffect(() => {
    token = localStorage.getItem("token")!;
  }, [isMyTokenExpired]);

  //  if (decodedToken.role === 'admin') {
  //   history.push("/admin-panel");
  //  }

   return (token) ? children : <Navigate to="/signin" />
};