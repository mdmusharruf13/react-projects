import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const url = "https://picsum.photos/v2/list";

  async function fetchImages(page, limit) {
    try {
      setLoading(true);

      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg(e.message);
    }
    console.log(images);
  }

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    console.log("previous");
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  useEffect(() => {
    fetchImages(1, 5);
  }, [url]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (errorMsg !== null) {
    return <div>Error occured : {errorMsg}</div>;
  }

  return (
    <div className="flex direction-col h-full w-full bg-light-grey">
      <h1 className="uppercase text-center m-10">Image Slider</h1>
      <div className="flex justify-center align-center m-10">
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className="arrow left-arrow"
        />
        {images && images.length
          ? images.map((item, index) => (
              <img
                key={item.download_url}
                src={item.download_url}
                alt={item.download_url}
                className={
                  index === currentSlide ? "image" : " image hide-current-image"
                }
              />
            ))
          : null}
        <BsArrowRightCircleFill
          onClick={handleNext}
          className="arrow right-arrow"
        />
      </div>
      <span className="flex justify-center align-center dot-container">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={
                  currentSlide === index
                    ? "dot-circle bg-grey"
                    : "dot-circle bg-white"
                }
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

export default App;
