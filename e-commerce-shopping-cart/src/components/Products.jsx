import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { GlobalContext } from "../utils/GlobalStorage";

export default function Products() {
  // console.log("produc  ts component loaded");
  const limit = 10;
  const maxLimit = 100;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const { cache, updateCache } = useContext(GlobalContext);
  const [categoryList, setCategoryList] = useState([]);
  const [showCategory, setShowCategory] = useState("all");
  const [showLoadBtn, setShowLoadBtn] = useState(false);
  const [categoryShowing, setCategoryShowing] = useState(false);

  const fetchData = async () => {
    try {
      // console.log("fetch: limit skip", limit, skip);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const updatedProducts = result.products.map((product) => ({
        ...product,
        quantity: 1,
        totalPrice: product.price,
      }));
      return updatedProducts;
    } catch (error) {
      console.error("Error in fetching the resipe :", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const categories = await response.json();
      // console.log(response);
      return categories;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLoadMore = () => {
    // set catego - true
    // setCategoryShowing(true);
    setSkip((prevVal) => prevVal + limit);
  };

  const filterByCategory = (category) => {
    setShowLoadBtn(false);
    // set cateshow-false
    // setCategoryShowing(false);
    return cache.filter((product) => product.category === category);
  };

  useEffect(() => {
    if (showCategory === "all") {
      setProducts(cache);
      setShowLoadBtn(true);
      return;
    }
    console.log(showCategory, "is current category");
    const filteredProducts = filterByCategory(showCategory);
    setProducts(filteredProducts);
  }, [showCategory]);

  useEffect(() => {
    // getCategories().then((categories) => setCategoryList(categories));
    const newCategories = products.map((products) => products.category);
    // console.log(newCategories, "product categories");
    setCategoryList([...new Set(newCategories)]);
  }, [products]);

  useEffect(() => {
    const loadProduct = async () => {
      // console.log("limit skip", limit, skip);
      if (cache.length && !products.length) {
        setProducts(cache);
        // console.log("cache");
        return;
      }

      const updatedProducts = await fetchData();
      setProducts((prevData) => [...prevData, ...updatedProducts]);
      if (updatedProducts.length > 0) {
        updateCache((prevData) => [...prevData, ...updatedProducts]);
      }
      setShowLoadBtn(true);
    };
    loadProduct();
  }, [skip]);

  // console.log(products);
  // console.log(categoryList, "category");
  return (
    <>
      <section className="m-3 max-h-3/6">
        <label htmlFor="category">Filter by category </label>
        <select
          name="category-list"
          id="category"
          className="border rounded p-1 bg-gray-100 overflow-y-auto "
          value={showCategory}
          onChange={(e) => setShowCategory(e.target.value)}
        >
          <option value="all">all</option>
          {categoryList.map((item) => (
            <option key={item} value={item} className="text-sm">
              {item}
            </option>
          ))}
        </select>
      </section>
      <section className="flex justify-center flex-wrap m-3 gap-1">
        {products && products.length
          ? products.map((product) => (
              <div key={product.id}>
                <Product product={product} />
              </div>
            ))
          : categoryShowing
          ? "no product found"
          : "loading..."}
      </section>
      {showLoadBtn && (
        <section className="flex justify-center items-center">
          {products.length < maxLimit ? (
            <button
              className="border px-3 py-1 bg-gray-400 rounded hover:bg-gray-500 m-5 "
              onClick={() => handleLoadMore()}
            >
              load more
            </button>
          ) : null}
        </section>
      )}
    </>
  );
}

// https://dummyjson.com/products/categories
