import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatu from './useAuthStatu'
import Spinner from './Spinner'

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatu()
    if(checkingStatus){
     return  <Spinner/>
    }
  return loggedIn ? <Outlet/> : <Navigate to='/auth' />
}