import React, { useState } from "react";
import loginSignUpImage from './../project-imge/login-animation.gif'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router=useNavigate()

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data,setData]=useState({firstname:"",lastname:"",email:"",password:"",confirmPassword:""
  })
  console.log(data);

  const handleShowPassword = () => {
    setShowPassword((prevalue) => !prevalue);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevalue) => !prevalue);
  };


  function handleChange(e){
    setData({...data,[e.target.name]:e.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      if(data.firstname && data.lastname && data.email && data.password && data.confirmPassword ){
        if(data.password === data.confirmPassword){
          
            const response =await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/auth/signup`,{data})
          // const response={data:{success:true , message:"Sign up Successfull" , token:"kjsahgdfkjj"}}
          if(response.data.success === true){
          alert(response.data.message)
          setData({firstname:"", lastname:"",email:"", password:"",confirmPassword:""})
          localStorage.setItem("my-tokendata",JSON.stringify(response.data.token));
          router('/login')
          }
        }else{
          alert("Password and cofirmpassword not same")
        }

      }else{
        alert("All fields are require")
      }
      
    }catch(error){
      console.log(error);
    }
  }

  
  
  
  return (
    <div className="pt-20 bg-slate-100 min-h-0 min-h-[650px] border-4 pt-20  ">
      <div className="w-full max-w-sm m-auto mb-10 drop-shadow-md shadow-md bg-white flex flex-col p-4">

       <div className="w-20 overflow-hidden flex m-auto  rounded-full drop-shadow-md shadow-md mb-5 mt-3">
          <img src={loginSignUpImage} className="w-full" alt="loginimage" />
        </div>

       


        <form className="w-full" onSubmit={handleSubmit} >
          <label className="text-xl font-bold">First Name :</label>
          <input
            type="text" 
            id="firstname" 
            name="firstname" 
            onChange={handleChange}
            value={data.firstname}
            className="w-full bg-slate-200 px-2 py-2 font-bold  mb-4 focus-within:outline-blue-400 mt-2 rounded-full pl-5 "
            placeholder="Enter your first name"
          />

          <label className="text-xl font-bold">Last Name :</label>
          <input
            type="text" 
            id="lastname"
            name="lastname" 
            onChange={handleChange}
            value={data.lastname}
            className="w-full bg-slate-200 px-2 py-2 font-bold  mb-4 focus-within:outline-blue-400 mt-2 rounded-full pl-5 "
            placeholder="Enter your last name"
          />

          <label className="text-xl font-bold  mt-3">Email:</label>
          <input
            type="email" 
            id="email" 
            name="email" 
            onChange={handleChange}
            value={data.email}
            placeholder="Enter your enail"
            className="w-full bg-slate-200 px-2 py-2  font-bold  focus-within:outline-blue-400 mt-2 rounded-full pl-5 mb-4"
          />

          <label className="text-xl font-bold ">Password:</label>

          <div className="  bg-slate-200 flex h-10  px-2 focus-within:outline focus-within:outline-blue-400 rounded-full ites-center pl-5 px-2 py-2 mt-2 mb-4 ">
            <input 
            id="password"
             name="password"
              onChange={handleChange}
              value={data.password}
              type={showPassword ? "text" : "password"}
              className="w-full bg-slate-200  outline-none font-bold "
              placeholder="Password"
            />
            <span className="flex text-xl " onClick={handleShowPassword}>
              {showPassword ? (
                <p>
                  {" "}
                  <i class="fa-solid fa-eye"></i>
                </p>
              ) : (
                <p>
                  <i class="fa-solid fa-eye-slash"></i>
                </p>
              )}
            </span>
          </div>

          <label className="text-xl font-bold ">ConfirmPassword:</label>

          <div className="  bg-slate-200 flex  px-2 h-10 focus-within:outline focus-within:outline-blue-400 rounded-full ites-center pl-5 px-2 py-2 mt-2 mb-4 ">
            <input 
            id="confirmPassword" 
            name="confirmPassword" 
            onChange={handleChange}
            value={data.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              className="w-full bg-slate-200  outline-none font-bold "
              placeholder="ConfirmPassword"
            />
            <span className="flex text-xl " onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? (
                <p>
                  {" "}
                  <i class="fa-solid fa-eye"></i>
                </p>
              ) : (
                <p>
                  <i class="fa-solid fa-eye-slash"></i>
                </p>
              )}
            </span>
          </div>

          <button className="w-full bg-red-600 h-12  hover:bg-red-800 rounded-full mt-4 cursor-pointer text-xl text-white font-bold" >Sign Up</button>
        </form>


        <p className="mt-3  ">Already  have account ? <Link to={'/login'} className="text-red-900 font-bold underline ">Login</Link> </p>
      </div>
    </div>
  );
};

export default SignUp;
