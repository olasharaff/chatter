import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignIn() {
  const navigate = useNavigate()
    const [isFormData, setIsFormData] = useState(
        {
            email: '',
            password: '',
        }
    )
    const {email, password} = isFormData

    const handleSelectChange = (e) => {
        setIsFormData((prevState) => ({
            ...prevState, [e.target.id]: e.target.value
        }))
    }
    async function onSubmitForm(e){
        e.preventDefault()

       try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        if(userCredentials.user){
            navigate('/dashboard')
            toast.success('Welcome back')
        }

       } catch (error) {
        toast.error('Invalid email or password')
       }
    }
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-10 text-2xl font-bold my-10">Welcome Back</h1>
        <div className="w-full auto px-16">
          <form className="flex flex-col" onSubmit={onSubmitForm}>
            <div className="mb-6">
              <label className="text-sm">
                Email
                <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="you@email.com"
                onChange={handleSelectChange}
                className="w-full rounded-md px-5 py-3  border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm">
                Password <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={handleSelectChange}
                placeholder="Password (min. of 8 characters)"
                className="w-full rounded-md px-5 py-3 border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>

            <div className="text-center mt-6 mb-6">
              <button

                type="submit"
                className="mt-3 w-full lg:text-base text-sm lg:px-28  px-10 py-2  rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]"
              >
               Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
