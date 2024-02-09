import React, {useState} from 'react'


export default function SignUp() {
    const [isFormData, setIsFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            comPassword: '',
        }
    )
    const handleSelectChange = (e) => {
        setIsFormData((prevState) => ({
            ...prevState, [e.target.id]: e.target.value
        }))
    }
    const {firstName, lastName, email, number, password} = isFormData
    const onSubmitForm = (e) => {
        e.preventDefault()
        console.log(isFormData)
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
                  placeholder="John doe"
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
                  id="username"
                  value={lastName}
                  placeholder="Johndoe"
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
                placeholder="you@email.com"
                onChange={handleSelectChange}
                className="w-full rounded-md px-5 py-1.5  border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm">
                Number
                <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="number"
                id="number"
                value={number}
                placeholder="0212345678"
                onChange={handleSelectChange}
                className="w-full rounded-md px-5 py-1.5  border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm">
                Password <span className="text-[#7234F5] text-xs">*</span>
              </label>
              <input
                type="text"
                id="password"
                value={password}
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
                type="text"
                id="password"
                value={password}
                onChange={handleSelectChange}
                placeholder="Password (min. of 8 characters)"
                className="w-full rounded-md px-5 py-1.5 border-none bg-gray-100 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="text-center mb-3 text-black">
              <button className=" w-full lg:text-base text-sm lg:px-28  px-10 py-2 rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]">
                Create account
              </button>
              <button
                type="button"
                className="mt-3 w-full lg:text-base text-sm lg:px-28  px-10 py-2  rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]"
              >
                Sign up with Google
              </button>
              <button
                type="button"
                className="mt-3 w-full lg:text-base text-sm lg:px-28  px-10 py-2  rounded-md hover:text-white  border-2  hover:bg-[#543EE0] focus:bg-[#543EE0]"
              >
                Sign up with linkedin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
