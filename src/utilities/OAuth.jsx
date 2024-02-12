import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth, db} from '../firebase'
import React from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {

    const navigate = useNavigate()

    async function onGoogleAuth(){
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          // create a method that check if user db already exists and then move the user data to firebase database

          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef)
          if(!docSnap.exists()){
            await setDoc(doc(db, "users", user.uid), {
              name: user.displayName,
              email: user.email,
              timestamp: serverTimestamp()
            });
            navigate('/dashboard')
            toast.success("Welcome to Chatter")
          }
        } catch (error) {
            toast.error("There is a error signing with google",error.message)
        }
    }
  return (
    <button
      type="button"
      onClick={onGoogleAuth}
      className="flex items-center whitespace-nowrap w-full justify-center mt-3 lg:text-base text-sm lg:px-28 px-10 py-2  rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]"
    >
      <FcGoogle className="text-2xl mx-2 bg-white rounded-full" /> Continue with
      Google
    </button>
  );


}
