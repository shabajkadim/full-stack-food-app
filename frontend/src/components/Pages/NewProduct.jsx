import React, { useState } from 'react'
import { showProfileImage } from '../ShowProfile/showProfileImage';
import axios from 'axios';

const NewProduct = () => {

  const[uploadedData,setUploadedDada]=useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:""
  })

 async function uploadImage(e){
    const uploadedData=await showProfileImage(e.target.files[0])
  // console.log(uploadedData);

  setUploadedDada((prevalue)=>{
    return{
      ...prevalue,
      image:uploadedData
    }
  })
  }
  
  const handleOnChange=(e)=>{
    setUploadedDada((prevalue)=>{
      return{...prevalue,[e.target.name]:e.target.value}})
  }

  console.log("11111");
  async function handleSubmit(e){
    e.preventDefault()
    try{
      if(uploadedData.name && uploadedData.category && uploadedData.image && uploadedData.price && uploadedData.description){
        const response=await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/product/add-product`,{uploadedData})
        if(response.data.success===true){
          alert(response.data.message)
         setUploadedDada({
          name:"",
          category:"",
          image:"",
          price:"",
          description:""
        })
          console.log(uploadedData);
        }
      }else{
        alert("all feild are required")
      }
    }catch(error){
      console.log(error);
    }
    console.log("22222");
  }
  
  return (
    <div className='pt-20 bg-slate-100 min-h-0 min-h-[650px]'>
      <div className='m-auto w-full max-w-md'>
        <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input type={'text'} name='name' className='bg-slate-200 p-1 my-1' onChange={handleOnChange}  value={uploadedData.name} />

          <label htmlFor='category'>Category</label>
          <select className='bg-slate-200 my-1 p-1' id='category' name='category' onChange={handleOnChange} value={uploadedData.category}>
            <option value={"others"} >Select Category</option>
            <option value={"fruite"}>Fruite</option>
            <option value={"vegetable"}>Vegetable</option>
            <option value={"ice-cream"}>Ice-Cream</option>
            <option value={"dosa"}>Dosa</option>
            <option value={"pizza"}>Pizza</option>
            <option value={"rice"}>Rice</option>
            <option value={"cake"}>Cake</option>
            <option value={"burger"}>Burger</option>
            <option value={"paneer"}>Paneer</option>
            <option value={"sandwich"}>Sandwich</option>
          </select>

          <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200  cursor-pointer rounded flex items-center justify-center' >
           {
             uploadedData.image? <img src={uploadedData.image}className='h-full' alt='dataimage' />:<span className='text-5xl '><i class="fa-solid fa-cloud-arrow-up"></i></span>
            
           }
           
            <input type='file'id='image' onChange={uploadImage} className='hidden' />
          </div>
          </label>

          <label htmlFor='price' className='my-1'> Price</label>
          <input type={'text'} id='price' className='bg-slate-200 p-1 ' value={uploadedData.price} onChange={handleOnChange} name='price'/>

          <label htmlFor="descriptoin">Description</label>
          <textarea rows={2} className='bg-slate-200 p-1 resize-none' onChange={handleOnChange} name='description' value={uploadedData.description} ></textarea>

          <button className='bg-red-500 hover:bg-green-500  my-2 text-lg font-bold p-2 rounded text-white'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default NewProduct
