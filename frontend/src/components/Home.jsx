import React, { useEffect, useRef, useState } from "react";
// import { AuthContext } from './context/AuthContext'
import axios from "axios";
import { HomeCard } from "./homeCard/HomeCard";
import { CardFeature } from "./All-products/cardFeature";
// import FilterProduct from "./All-products/FilterProduct";
import { useNavigate } from "react-router-dom";
import { AllProduct } from "./All-products/AllProduct";


const Home = () => {
  const [products, setProducts] = useState([]);
  
  // console.log(products, "products");
  
  const router=useNavigate()

  const filterProduct = products.slice(3, 7);
  // const loading = new Array(4).fill(null);

  const vegetableProduct = products.filter((element) => element.category === "vegetable",[]);
  // console.log(vegetableProduct, "111111");

  

  const slideProductRef=useRef()
  const nextProduct=()=>{
    slideProductRef.current.scrollLeft +=200
  }
  const backProduct=()=>{
    slideProductRef.current.scrollLeft -=200
  }

  async function getProducts() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMIN}/api/v1/product/get-product`
      );
      if (response?.data.success) {
        setProducts(response.data.getAllData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getProducts();
  }, []);

 


    //redirect 

     function redirect(id){
      router(`/menu/${id}`)
    }
  

  return (
    <div className="pt-20 bg-slate-100 min-h-0 min-h-[650px] ">
      <div className="p-2 md:p-4  md:flex">
      <div className=" md:w-1/2">
          <p className=" md:flex ">
            <span className=" bg-slate-400 items-center  text-xl font-bold text-neutral-900 md:bg-slate-400  mr-4 h-12 items-center pt-2 px-4 rounded-full  text-2xl font-bold text-neutral-900 ">
              {" "}
              Bike Delivery{" "}
            </span>
            <span className="md: w-40  border-b-4  border-red-900 mmb-2 ">
              <img
                className="h-20 "
                src="https://cdn-icons-png.freepik.com/512/9561/9561688.png"
                alt="bike-imge"
              />
            </span>
          </p>
          <p className="text-4xl font-bold  md:text-7xl font-bold">
            The Fasted Delivery In{" "}
            <span className="text-red-500">Your Home</span>
          </p>

          <p className="md:mt-2 text-small max-w-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. 
          </p>
          <button className="bg-red-500 hover:bg-red-700 mt-2 h-10 w-40 text-slate-100  font-bold rounded-md">
            ORDER NOW
          </button>
        </div>

        <div className=" md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {filterProduct.map((element) => {
            return (
              <div onClick={()=>redirect(element._id)} >
                <HomeCard
                  key={element._id}
                  image={element.image}
                  name={element.name}
                  price={element.price}
                  category={element.category}
                />
              </div>
            );
          }) }
        </div>

      </div>

      <div className="p-2 md:p-4 ">
        <div className="flex w-full text-center">
          <p className="font-bold text-3xl text-slate-800">
            Fresh Vegetable
          </p>
          
          <div className="ml-auto flex gap-3">
            <button onClick={backProduct} className="bg-slate-300 hover:bg-slate-400 w-10 text-xl p-1 rounded "  ><i class="fa-solid fa-angle-left"></i></button>
            <button  onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 w-10 text-xl p-1 rounded "><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>

        {<div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all " ref={slideProductRef}>
          {vegetableProduct.map((element) => {
            return (
              <div onClick={()=>redirect(element._id)}>
              <CardFeature
                key={element._id}
                id={element._id}
                image={element.image}
                name={element.name}
                category={element.category}
                price={element.price}
              />
              </div>
            );
          })}
        </div>}


      </div>

     <div>
      <AllProduct category={"All Product"} /> 
     </div>
    </div>
  );
};

export default Home;
