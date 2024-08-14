import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../utils/GlobalStorage";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartData, clearCart } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalAmount = () => {
      const amounts = cartData.map((item) => item.totalPrice);
      const total = amounts.reduce((total, current) => total + current, 0);
      return Math.round(total);
    };
    setTotalPrice(totalAmount());
    // console.log("price calculated");
  }, [cartData]);

  if (!cartData.length) {
    return (
      <section className="flex flex-col justify-center items-center gap-20 w-full">
        <p className="text-xl font-bold pt-4 ">Cart is Empty</p>
        <button
          className="w-fit text-xl border py-1 px-3 bg-slate-400 hover:bg-slate-300 rounded"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </section>
    );
  }

  return (
    <>
      <section>
        <p className="text-2xl font-semibold text-center">Cart</p>
      </section>
      <section className="flex justify-between text-xl m-3">
        <p>
          <strong>Total Price: ${totalPrice}</strong>
        </p>
        <button
          className="border px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
          onClick={clearCart}
        >
          clear cart
        </button>
      </section>
      <section className="flex flex-wrap m-3 ">
        {cartData && cartData.length ? (
          cartData.map((product) => (
            <div key={product.id} className="min-w-full">
              <CartItem productData={product} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
}
