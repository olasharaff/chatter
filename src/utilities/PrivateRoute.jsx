import React from 'react'
import useAuthStatu from './useAuthStatu'
// import Spinner from './Spinner'
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const {isLogIn, checkingStatus} = useAuthStatu()
    if (checkingStatus){
        return <> <h1>Loading ...</h1></> 
        
    }
  return isLogIn ? <Outlet/> : <Navigate to="/auth"/>
}
