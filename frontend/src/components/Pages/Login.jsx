import React, { useContext, useState } from "react";
import loginSignUpImage from "./../project-imge/login-animation.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext  } from "../context/AuthContext.js";


const Login = () => {

const {LOGIN}=useContext(AuthContext)//mydata


  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // console.log(loginData);
  
 
  const handleShowPassword = () => {
    setShowPassword((prevalue) => !prevalue);
  };

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }



  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (loginData.email && loginData.password) {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/auth/login`, { loginData });
        // const response={data:{success:true , message:"login suucessfulr",token:"qhdfewghukb45",userData:{name:"shabaaj",email:"shabaaj@1234"}}}
            if(response.data.success===true){
              localStorage.setItem("token",JSON.stringify(response.data.token))
              LOGIN(response.data.user)//mydata
              alert(response.data.message)
              setLoginData({email:"" , password:""})
              router('/')
              
            }
      } else {
        alert("All fields are required");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error,"please check password or email")
      router('/sign-up')
    }
  }
  
  return (
    <div className="pt-20 bg-slate-100 min-h-0 min-h-[650px] border-4 pt-20  ">
      <div className="w-full max-w-sm m-auto mb-10 drop-shadow-md shadow-md bg-white flex flex-col p-4">
        {/* <h1 className="text-center text-3xl font-bold pt-5">Sign Up</h1> */}
        <div className="w-20 overflow-hidden flex m-auto  rounded-full drop-shadow-md shadow-md mb-5 mt-3">
          <img src={loginSignUpImage} className="w-full" alt="loginimage" />
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <label className="text-xl font-bold  mt-3">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={loginData.email}
            placeholder="Enter your enail"
            className="w-full bg-slate-200 px-2 py-2  font-bold  focus-within:outline-blue-400 mt-2 rounded-full pl-5 mb-4"
          />

          <label className="text-xl font-bold ">Password:</label>

          <div className="  bg-slate-200 flex h-10  px-2 focus-within:outline focus-within:outline-blue-400 rounded-full ites-center pl-5 px-2 py-2 mt-2 mb-4 ">
            <input
              id="password"
              name="password"
              onChange={handleChange}
              value={loginData.password}
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

          <button className="w-full bg-red-600 h-12  hover:bg-red-800 rounded-full mt-4 cursor-pointer text-xl text-white font-bold">
            Login
          </button>
        </form>

        <p className="mt-3  ">
          Don't have account ?{" "}
          <Link to={"/sign-up"} className="text-red-900 font-bold underline ">
            sign-up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;

