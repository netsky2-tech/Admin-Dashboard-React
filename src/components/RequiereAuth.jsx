import React, {useEffect} from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Cookies from "universal-cookie"
const cookies = new Cookies();
const RequiereAuth = () => {
        const auth = [];
        //console.log(auth)
        const location = useLocation();

            useEffect(() => {
               auth = JSON.parse(localStorage.getItem("username"));
               console.log(auth)
            }, []);
    
  return (
    auth.length > 0
        ? <Outlet/>
        : <Navigate to="/login" state={ { from: location } } replace></Navigate>
  );
}

export default RequiereAuth