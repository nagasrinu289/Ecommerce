import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
const ResetLayout = () => {
    const location = useLocation();

    return (
        localStorage.getItem("ResetPass") ?
            (<Outlet />) : (<Navigate to='/' state={{ from: location }} replace />)
    )
}

export default ResetLayout
