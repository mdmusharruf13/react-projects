import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../utils/GlobalStorage";

export default function CartItem({ productData }) {
  const { removeFromCart, updateCart, cartData } = useContext(GlobalContext);
  const [product, setProducts] = useState(productData);
  const [clone, setClone] = useState(product);

  const handleClick = (option) => {
    setProducts((prevData) => {
      const newQuantity =
        option === "increment"
          ? prevData.quantity + 1
          : Math.max(prevData.quantity - 1, 1);
      const newPrice = newQuantity * prevData.price;
      const updatedProduct = {
        ...prevData,
        quantity: newQuantity,
        totalPrice: newPrice,
      };
      return updatedProduct;
    });
    // console.log(cartData, product, "after update");
  };

  useEffect(() => {
    // console.log("effect ", cartData);
    updateCart(product);
  }, [product]);
  // console.log("last", cartData);

  return (
    <article className="flex justify-around items-center bg-slate-100 w-full border rounded-xl my-1 p-1">
      <div className="flex items-center justify-center basis-2/5 flex-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={"70px"}
          className="md:w-[20vh]"
        />
        <p className="basis-2/4 text-center font-semibold text-sm/4 sm:text-[1.75vh]/7 md:text-[2vh]">
          {product.title}
        </p>
      </div>
      <div className="basis-2/5 flex justify-around items-center flex-wrap">
        <p className="text-sm/4 sm:text-[1.75vh]/7 md:text-[2vh]">
          <button
            className="p-2 text-[2.5vh]"
            onClick={() => handleClick("increment")}
          >
            +
          </button>
          <input
            type="text"
            className="min-w-5 w-10 p-2 bg-slate-200 rounded-lg outline-none text-center"
            value={product.quantity}
            disabled
          />
          <button
            className="p-2 text-[3vh]"
            onClick={() => handleClick("decrement")}
          >
            -
          </button>
        </p>
        <p className="text-sm/4 sm:text-[1.75vh]/7 md:text-[2vh]">
          <strong>Price: </strong>${Math.round(product.totalPrice)}
        </p>
      </div>
      <div className="flex ">
        <button
          className="basis-1/5 border px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm/5 sm:text-[1.75vh]/6 md:text-[2vh]"
          onClick={() => removeFromCart(product.id)}
        >
          remove
        </button>
      </div>
    </article>
  );
}
