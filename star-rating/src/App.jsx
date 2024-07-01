import { useState } from "react";
import { IoIosStar } from "react-icons/io";

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    setRating(index);
  };

  const handleMouseOver = (hoverIndex) => {
    setHover(hoverIndex);
  };
  const handleMouseLeave = () => {
    setHover(rating);
  };

  return (
    <>
      <h1 className="text-center m-20">rating Rating</h1>
      <div className="flex justify-center align-center">
        {[...Array(10)].map((_, index) => {
          index += 1;
          return (
            <div>
              <IoIosStar
                className={`box ${
                  index <= (hover || rating) ? "bg-yellow" : null
                }`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseOver(index)}
                onMouseLeave={() => handleMouseLeave()}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
