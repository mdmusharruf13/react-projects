import { Children, useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const fetchProducts = async () => {
    if (products.length >= 100) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();

      if (result && result.products && result.products.length) {
        // setProducts((prevData) => {
        //   const combinedProducts = [...prevData, ...result.products];
        //   const uniqueProducts = Array.from(new Set(combinedProducts).values());
        //   console.log("unique products ", uniqueProducts);
        //   return uniqueProducts;
        // });
        setProducts((prev) => [...prev, ...result.products]);
        setLoading(false);
      }

      console.log("result", result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (count === 0) {
      fetchProducts();
    } else if (!disableButton) {
      fetchProducts();
    }
  }, [count]);

  useEffect(() => {
    if (products && products.length >= 100) {
      setDisableButton(true);
    }
  }, [products]);

  if (loading) {
    return <div>Loading data ! Please wait.</div>;
  }

  return (
    <main className="flex direction-col h-full">
      <section className="p-10">
        <h2 className="text-center uppercase">Products List</h2>
      </section>
      <section className="flex wrap justify-center align-center cursor-pointer">
        {products && products.length
          ? products.map((item) => (
              <div
                key={item.id}
                className="card h-270px w-270px m-5 p-10 border radius-5 flex direction-col align-center"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-200px h-200px"
                />
                <p className="text-center">{item.title}</p>
              </div>
            ))
          : null}
      </section>
      <section className="flex justify-center align-center">
        <button
          className="button"
          disabled={disableButton}
          onClick={() => setCount((count) => count + 1)}
        >
          load more
        </button>
        {disableButton ? <p>You have reached to 100 products</p> : null}
      </section>
    </main>
  );
}

export default App;
