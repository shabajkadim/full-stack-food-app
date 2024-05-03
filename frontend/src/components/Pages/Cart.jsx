import { useSelector } from "react-redux";
import { CartProduct } from "../All-products/CartProduct";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  // console.log(productCartItem, "productItem");

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
    
  return (
    <>
      <div className="pt-20 bg-slate-100 p-2:p-4 min-h-0 min-h-[650px]">
        <div className="text-lg md:text-3xl font-bold text-slate-600 ml-2">
          Your Cart Item{" "}
        </div>

        {productCartItem[0] ?
          <div className="mt-4 ml-2 md:flex  ">
            <div className="w-full max-w-3xl  ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>

            <div className="ml-auto  w-96  mt-2 rounded  mr-6">
              <div className=" text-center bg-blue-600 text-white font-bold py-3 px-5 text-lg ">
                Summary
              </div>

              <div className="flex  w-full h-12 mt-2 px-5   border-b border-slate-400 text-center items-center ">
                <p className="text-lg font-medium">Total Qty :</p>
                <p className="w-[250px] ml-auto font-bold text-lg">
                  
                  <span className="text-red-600 font-bold">₹</span> {totalQty}
                </p>
              </div>

              <div className="flex  w-full h-12 mt-2 px-5    text-center ">
                <p className="text-lg font-medium">Total price :</p>
                <p className="w-[250px] ml-auto font-bold text-lg">
                  
                  <span className="text-red-600 font-bold">₹</span>
                  {totalPrice}
                </p>
              </div>

              <button className="bg-red-400 w-full p-3 text-white text-lg font-bold m-auto hover:bg-red-600"  > 
                Payment
              </button>
            </div>
          </div>
          :
          <>
          <div className="flex flex-col  w-full  md:w-96 m-auto">
            <p><img src="https://bexcart.com/assets/images/empty-cart.gif" alt="emptycart"  className=""/></p>
            <p className="text-4xl font-bold  text-center">Empty Cart </p>
          </div>
          </>
        }
      </div>
    </>
  );
};

export default Cart;
