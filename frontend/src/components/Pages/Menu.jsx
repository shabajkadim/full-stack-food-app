import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AllProduct } from '../All-products/AllProduct';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/productSlice';

const Menu = () => {
  const[singleData,setSingleData]=useState([])
  // console.log(singleData,"singleData");
  const dispatch=useDispatch()

  // const sliceOneProduct=singleData.slice(2,3)
  // console.log(sliceOneProduct,"sliceOneProduct");

  const handleAddCarProduct=(e)=>{
    dispatch(addCartItem(displayData))
  }

  const{id}=useParams()

  const displayData=singleData.filter(elemet=>elemet._id === id )[0]
  // console.log(displayData,"321");



  const getSingleProduct=async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/product/get-product`);
      if (response?.data.success) {
        setSingleData(response.data.getAllData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
   
      getSingleProduct()
    
  },[])
  return (
    <div className='p-2 md:p-4'>
     <div className='mt-20  bg-white shadow   md:flex w-full max-w-4xl m-auto pb-5 '>
      <div className='overflow-hidden  md:max-w-[350px] '>
        <img src={displayData?.image} alt='manuimage' className='hover:scale-105 p-4 transition-all ' />
      </div>

      <div className='md:flex  flex-col gap-1 md:gap-3'>
        <p className=" font-semibold capitalize mt-3 folt-lg text-slate-700 text-3xl md:text-4xl">{displayData?.name}</p>
        <p className=" capitalize font-medium text-slate-500 text-2xl md:text-3xl ">{displayData?.category}</p>
        <p className=" font-bold text-3xl"><span className="text-red-600">₹</span>{displayData?.price}/-</p>
        
        <div className='flex gap-6'>
        <button className="bg-yellow-500 hover:bg-yellow-600 w-40 h-12 mt-1 font-bold text-slate-800  mb-4">Buy Now</button>
        <button onClick={handleAddCarProduct} className="bg-yellow-500 hover:bg-yellow-600 w-40 h-12 mt-1 font-bold text-slate-800  mb-4">Add Cart</button>
        </div>

        <p className='capitalize font-bold text-slate-700 text-2xl h-[120px] '>Description :-<p className='ml-3 capitalize font-medium text-xl text-slate-700'>{displayData?.description}</p></p>

        
      </div>
      
      </div>

    <div>
      <AllProduct category={"All product"}/>
    </div>

   
    </div>
  )
}

export default Menu

