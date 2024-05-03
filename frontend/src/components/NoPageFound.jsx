import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoPageFound = () => {
    const router=useNavigate()

    setTimeout(()=>{
        router('/')
    },3000)
  return (
    <div className='pt-20 bg-slate-100 min-h-0 min-h-[650px]'>
      <h3>Loading....</h3>
    </div>
  )
}

export default NoPageFound
