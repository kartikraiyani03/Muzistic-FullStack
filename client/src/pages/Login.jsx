/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.png'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLogin, signupHandler } from '../redux/slice/accountSlice';

const Login = ({ login }) => {

  let nav = useNavigate()
  let dis = useDispatch();

  let [formData, setFormData] = useState({ email: '', password: '' })
  let [error, setError] = useState({ email: '', password: '' })

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...error };
    let isValid = true

    switch (fieldName) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required.';
          isValid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = 'Please enter a valid email address.';
          isValid = false;
        } else {
          newErrors.email = ''; // Clear error if valid
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required.';
          isValid = false;
        } else {
          newErrors.password = ''; // Clear error if valid
        }
        break;

      default:
        break;
    }

    setError(newErrors); // Update error state dynamically
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }


    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.values(error).every((error) => error === '') && validateForm()) {

      try {
        let res = await axios.post("http://localhost:3000/user/login", formData)
        if (res.status == 200) {
          console.log("User Login Successfully ", res.data.data[0])
          console.log('Form submitted', formData);

          let emptyData =
            setFormData({ email: '', password: '' })
          dis(signupHandler(res.data.data[0]))
          // dis(setLogin())
          nav('/account')
        }
        else {
          console.log("Login Failed ", res.data);
        }
      }
      catch (err) {
        console.log("Error while Submitted form", e.message);
      }

    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className='pt-[100px]'>
      <div className="flex  min-h-full overflow-x-hidden bg-black text-white flex-1 flex-col justify-start mt-10 px-6 h-[100vh] lg:px-8">
        <div className="sm:mx-auto relative  sm:w-full sm:max-w-sm">

          <div className="absolute top-10 -right-[5rem] w-64 h-64 rounded-full bg-radial-gradient from-red to-transparent blur-[80px] pointer-events-none"></div>
          <h2 className="text-center z-20 text-2xl/9 font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-5 z-20 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="" onSubmit={submitHandler} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={formData.email}
                  onChange={changeHandler}
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="block w-full bg-transparent outline-none  px-3 py-2 text-base text-gray-900 border-b-2 border-zinc-600 placeholder:text-gray focus:outline focus:outline-2  focus:border-b-red sm:text-sm/6"
                />
                {error.email && <span className='text-red text-[13px] text-start'>{error.email}</span>}

              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={formData.password}
                  onChange={changeHandler}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full  bg-transparent outline-none px-3 py-2 text-base text-gray-900 border-zinc-600  placeholder:text-gray-400 focus:outline focus:outline-2 border-b-2 focus:border-b-red sm:text-sm/6"
                />
                {error.password && <span className='text-red text-[13px] text-start'>{error.password}</span>}

              </div>
            </div>

            <div className='pt-3'>
              <button
                className="flex w-full justify-center border-2 border-red rounded-md 
            bg-transparent px-3 py-1.5 text-sm/6 font-semibold text-red shadow-sm hover:bg-red hover:border-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm/6 text-gray-500">
            Don&apos;t have any account ?{' '}
            <NavLink to="/signup" className="font-semibold text-red ">
              Signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;