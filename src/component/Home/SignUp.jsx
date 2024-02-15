import React, { useState } from "react";
import {
 
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../../utilities/OAuth";
import {FaLinkedin } from "react-icons/fa";
import Spinner from "../../utilities/Spinner";

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [isFormData, setIsFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    comPassword: "",
  });


  const handleSelectChange = (e) => {
    setIsFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { firstName, lastName, email, password, comPassword } = isFormData;
  const navigate = useNavigate();

  async function onSubmitForm (e){
    e.preventDefault();

    if (password !== comPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
     
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
        console.warn("what is happening... 1");

      console.warn(user)
        console.warn("what is happening... 2");

      await updateProfile(user, { displayName: `${firstName} ${lastName}` });



        console.warn("what is happening... 3");

      const formDataCopy = { ...isFormData };
      delete formDataCopy.password

        console.warn("what is happening... 4");

      formDataCopy.timestamp  = serverTimestamp();
  console.warn("what is happening... 5");
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      
        console.warn("what is happening... 6");
       
      navigate("/dashboard");

       console.warn("what is happening... 7");
      setLoading(true)
      toast.success("Account created successfully");

      console.warn("what is happening... 8");
     
    } catch (error) {
      console.warn(error.message);
      toast.error("Error creating account");
    }
  };
  if(loading){
    return <Spinner/>
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-10 text-2xl font-bold">
          Register as a Writer/Reader{" "}
        </h1>
        <div className="max-w-lg auto px-9">
          <form className="flex flex-col" onSubmit={onSubmitForm}>
            <div className="flex gap-10">
              <div className="mb-3">
                <label className="text-sm">
                  First-Name
                  <span className="text-[#7234F5] text-xs">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="John"
                  onChange={handleSelectChange}
                  className="w-full rounded-md px-5 py-1.5  border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
                />
              </div>
              <div className="mb-3">
                <label className="text-sm">
                  Last-Name <span className="text-[#7234F5] text-xs">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Doe"
                  onChange={handleSelectChange}
                  className="w-full rounded-md px-5 py-1.5  border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-sm">
                Email
                <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="JohnDoe@email.com"
                onChange={handleSelectChange}
                className="w-full rounded-md px-5 py-1.5  border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm">
                Password <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                autoComplete="off"
                onChange={handleSelectChange}
                placeholder="Password (min. of 8 characters)"
                className="w-full rounded-md px-5 py-1.5 border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm">
                Confirm Password{" "}
                <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="password"
                id="comPassword"
                autoComplete="off"
                value={comPassword}
                onChange={handleSelectChange}
                placeholder="Password (min. of 8 characters)"
                className="w-full rounded-md px-5 py-1.5 border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="text-center mb-3 text-black">
              <button
                type="submit"
                className="w-full lg:text-base text-sm lg:px-28 px-10 py-2 rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]"
              >
                Create account
              </button>
              <OAuth />
              <button
                type="button"
                disabled
                className="flex items-center whitespace-nowrap w-full cursor-not-allowed justify-center mt-3 lg:text-base text-sm lg:px-28 px-10 py-2  rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]"
              >
                <FaLinkedin className="text-2xl mx-2 bg-[#0077B5] text-white rounded-md border-white" />
                Continue with Linkedin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
