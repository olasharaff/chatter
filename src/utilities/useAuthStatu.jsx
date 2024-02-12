import { getAuth, onAuthStateChanged } from 'firebase/auth'
import  { useEffect, useState } from 'react'

export default function useAuthStatu() {
    const [isLogIn, setIsLogIn] = useState(false)

    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(()=> {
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=> {
            if (user){
                setIsLogIn(true)
            }
            setCheckingStatus(false)
        })
    }, [])
  return [isLogIn, checkingStatus]
}
