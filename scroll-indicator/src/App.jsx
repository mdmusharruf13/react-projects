import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const result = await response.json();
      setLoading(false);
      console.log(result);
      setData(result.products);
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  const handleScroll = () => {
    // console.log(
    //   document.body.scrollTop,
    //   document.documentElement.scrollTop,
    //   document.documentElement.clientHeight,
    //   document.documentElement.scrollHeight
    // );

    const scrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((scrolled / height) * 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <main className="h-full">
        <section className="h-inherit flex direction-col">
          <div className="fixed z-index-1 ">
            <h1 className="text-center p-10 bg-green text-white">
              Custom Scroll Indicator
            </h1>
            <div className="h-10 w-full bg-light-green">
              <div
                className="bg-grey h-inherit"
                style={{ width: `${scrollPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-100">
            {data && data.length > 0
              ? data.map((product) => <p key={product.id}>{product.title}</p>)
              : null}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
