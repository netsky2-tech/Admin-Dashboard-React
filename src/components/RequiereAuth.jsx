import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequiereAuth = () => {
        const  auth  = useAuth();
        const location = useLocation();
  return (
    auth?.Outcome
        ? <Outlet/>
        : <Navigate to="/login" state={ { from: location } } replace></Navigate>
  );
}

export default RequiereAuth