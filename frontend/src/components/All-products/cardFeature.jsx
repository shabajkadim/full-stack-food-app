import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

export const CardFeature = ({ name, image, category, price,id }) => {
  const dispatch=useDispatch()
  const handleAddCarProduct=(e)=>{
    dispatch(addCartItem({
      _id:id,
      name:name,
      image:image,
      category:category,
      price:price}))
  }
  


  return (
    <div className="w-full mt-4 min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg px-4 pt-4 flex flex-col justify-center cursor-pointer">
    {image ?(
      <>
      <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:0 , behavior:"smooth"})}>
      <div className="h-28 items-center flex flex-col justify-center">
        <img className="h-full rounded w-full " src={image} alt="produt-img" />
      </div>
      <p className="text-center font-semibold capitalize text-slate-700 text-lg mt-4 whitespace-nowrap overflow-hidden">
        {name}
      </p>
      <p className="text-center capitalize font-medium text-slate-500 ">
        {category}
      </p>
      <p className="text-center font-bold">
        <span className="text-red-600">₹</span>
        {price}/-
      </p>
      </Link>
      <button className="bg-yellow-500 w-full hover:bg-yellow-600 h-10 mt-1 font-bold text-slate-800 hover:rounded-[50px] mb-4" onClick={()=>handleAddCarProduct(id)}>Add Cart</button>

     
      </>
    ):null}
    </div>
  );
};
