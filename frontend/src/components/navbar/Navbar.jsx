import React, { useContext, useEffect, useState } from "react";
// import logo from "./../project-imge/logo.png";
import { Link } from "react-router-dom";
import homelogo from './../project-imge/homelogo.png'
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
// import { FaCartShopping } from "react-icons/fa6"
// import { CgProfile } from "react-icons/cg"


export const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const[menuList,setMenuList]=useState(false);

  const {state,LOGOUT}=useContext(AuthContext)
  console.log(state);

  const handleShowProfile=()=>{
    setShowProfile((prevalue=>!prevalue))
  }

  useEffect(() => {
    if (menuList) {
      setTimeout(() => {
        setMenuList(false);
      }, 3000);
    }
    return ()=> clearTimeout(menuList);
  }, [menuList]);

  useEffect(() => {
    if (showProfile) {
      setTimeout(() => {
        setShowProfile(false);
      }, 3000);
    }
    return () => clearTimeout(showProfile);
  }, [showProfile]);



  const handleShowMenu=()=>{
    setMenuList((prevalue=>!prevalue))
  }
  // const value=state.user.firstname.slice(0,1).toLow

  const cartItemNumber=useSelector((state)=>state.product.cartItem)

  console.log(process.env.REACT_APP_ADMIN_GMAIL);
  
  return (
    <navbar className="fixed shadow-md w-full h-16 px-2  md:px-4 z-50 bg-white">
      {/* {Dekstop} */}
      <div className="flex items-center h-full w-full  justify-between ">
        <Link to={"/"}>
          <div className="h-14 w-28 ">
            {/* <img src={logo} className="h-full" /> */}
            <img src={homelogo} alt="homelogo" className="h-full w-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8  ">
          <div className="flex gap-5 md:gap-8 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/:id"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </div>

          <div  className=" md:hidden  text-xl text-slate-600" >
            <div onClick={()=>handleShowMenu()} className="text-2xl cursor-pointer">
              <i class="fa-solid fa-bars"></i>
              
            </div>
            {menuList && (<div className=" absolute flex flex-col bg-white gap-2  mt-2 text-base py-2 px-2 shadow drop-shadow ">
            <Link to={""}>Home</Link>
            <Link to={"menu/:id"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </div>
        )}
          </div>

          <div className="text-2xl text-slate-600 relative">
           <Link to={'/cart'} className="cursor-pointer">
           <i class="fa-solid fa-cart-shopping"></i>
           {/* <FaCartShopping/> */}
            <div className="absolute -top-2 -right-2 text-white rounded-full m-0 p-0 text-sm h-5 w-5 text-center bg-red-500">
              {cartItemNumber.length}
            </div>
           </Link>
          </div>

          <div className="text-xl text-slate-600 pr-4 md:pr-2" onClick={handleShowProfile} >
            <div className="text-3xl cursor-pointer ">
            {state?.user?.firstname ? (<p className="border-slate-900 border rounded-full shadow-rose-900 drop-shadow w-9 h-9 bg-neutral-300 text-slate-900 text-2xl  font-bold text-center white-200">{state.user.firstname.slice(0,1).toUpperCase()}</p>) : ( <p><i class="fa-regular fa-circle-user"></i></p>)}
            </div>
            {showProfile && (
              <div  className="absolute flex flex-col mt-1 rounded right-2 bg-slate-600 text-white py-2 px-2 shadow drop-shadow">
                {state?.user?.email === process.env.REACT_APP_ADMIN_GMAIL && <Link to={'new-product'} className="whitespace-nowrap cursor-pointer">New Product</Link>}
                
                
                {state?.user?.firstname? <p><p>{state?.user?.firstname.toUpperCase()}</p><button onClick={()=>LOGOUT()}>LOGOUT</button><p></p></p>:<Link to={'login'} className="whitespace-nowrap cursor-pointer">Login</Link>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
    </navbar>
  );
};
