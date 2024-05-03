import React from 'react'

const Contact = () => {
  return (
    <div className='pt-20 bg-slate-100 min-h-0 min-h-[650px]'>
      <h2>Contact</h2>
    </div>
  )
}

export default Contact

// import React from 'react'
// import { AuthContext } from './context/AuthContext.js'

// const Home = () => {
  
//   const{state,LOGOUT}=useContext(AuthContext)
//   return (
//     <div className=' bg-slate-100 min-h-0 min-h-[650px]' style={state} >
//       <h3  >welcome :{state?.username?.name}
//       <button onClick={()=>LOGOUT()}></button></h3>

//       <h2 className=''>Home</h2>
//       {/* <hr/> */}
//     </div>
//   )
// }

// export default Home
