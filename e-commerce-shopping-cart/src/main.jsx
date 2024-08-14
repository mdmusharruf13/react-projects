import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart.jsx";
import Products from "./components/Products.jsx";
import GlobalStorage from "./utils/GlobalStorage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalStorage>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Products />} />
          <Route path="cart" element={<Cart />} />

          <Route
            path="/*"
            element={
              <section>
                <p className="font-2xl flex justify-center items-center">
                  There is nothing here!
                </p>
              </section>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </GlobalStorage>
);
