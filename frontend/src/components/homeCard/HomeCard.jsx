export const HomeCard=({image,name,price,category})=>{
    return(
        <div className="bg-white p-2 rounded shadow ">
            <div className="w-40 cursor-pointer "   >
                <img src={image} className=" h-full w-full " alt="homecartimage" />
                <p className="text-center font-semibold capitalize text-slate-700 text-lg">{name}</p>
                <p className="text-center capitalize font-medium text-slate-500 ">{category}</p>
                <p className="text-center font-bold"><span className="text-red-600">₹</span>{price}/-</p>
            </div>
        </div>
    )
}