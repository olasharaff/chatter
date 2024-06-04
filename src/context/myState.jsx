import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { auth, db } from '../firebase'
import { useNavigate,  } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function myState(props) {
  const [mode, setMode] = useState('light')
  const [isPosting, setIsPosting] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  // handle logout
  const handleLogOut = () => {
    auth.signOut()
    localStorage.clear('users')
    toast.success(' Logged out successfully')
    navigate('/')
  }

  // fetch all data by the user
  const fetchUserPostings = async ()=> {
    if(auth.currentUser){
      const listingRef = collection(db, 'postings')
    const q = query(listingRef, where('userRef', '==', auth.currentUser.uid), orderBy('timeStamp', 'desc'))
    const querySnap = await getDocs(q)
    let listings = []
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      })
    })
    setIsPosting(listings)
    setLoading(false)
    }else{
setLoading(false)
    }
    
  }
  // when click on individual post 
  
  


  useEffect(() => {
    
    fetchUserPostings()
  }, [])

  const deletePosts = async (id) => {
    try {
      await deleteDoc(doc(db, 'postings', id))
      fetchUserPostings()
      toast.success('Blogs deleted successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = 'rgb(17, 24, 39)'
    } else {
      setMode('light')
      document.body.style.backgroundColor = 'white'
    }
  }
  return (
    <MyContext.Provider value={{ mode, toggleMode, handleLogOut, isPosting, deletePosts, loading }}>
      {props.children}
    </MyContext.Provider>
  )
}
