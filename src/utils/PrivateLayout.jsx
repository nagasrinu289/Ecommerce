import React from 'react'
import { Outlet,useLocation,Navigate } from 'react-router-dom'
import { useAuth } from './auth';
const PrivateRouteLayout = () => {
    const { user } = useAuth();
    const location = useLocation();
  return user ?
   (<Outlet />) : (<Navigate to='/' state={{from:location}} replace />)
} 

export default PrivateRouteLayout; 
