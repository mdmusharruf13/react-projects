import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalStorage({ children }) {
  const [cartData, setCartData] = useState([]);
  const [cache, setCache] = useState([]);

  const updateCache = (products) => {
    setCache(products);
  };

  const addToCart = (product) => {
    setCartData((prevData) => [...cartData, product]);
  };
  const removeFromCart = (productId) => {
    const cartClone = cartData.filter((product) => product.id !== productId);
    setCartData(cartClone);
  };
  const updateCart = (product) => {
    const newCart = cartData.map((item) =>
      item.id === product.id ? product : item
    );
    setCartData(newCart);
  };
  const clearCart = () => {
    setCartData([]);
  };

  const contextValue = {
    cartData,
    setCartData,
    addToCart,
    removeFromCart,
    updateCart,
    cache,
    updateCache,
    clearCart,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
