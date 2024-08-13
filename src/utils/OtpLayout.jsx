import React from 'react'
import { Outlet,useLocation,Navigate } from 'react-router-dom'

const OtpLayout = () => {
    const location = useLocation();
  return (
    localStorage.getItem("hasEmail") ?
   (<Outlet />) : (<Navigate to='/' state={{from:location}} replace />)
  )
}

export default OtpLayout
