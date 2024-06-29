import { useRef, useState } from "react";
import dataList from "./db/questions";
import arrow from "./images/arrow.png";

function App() {
  const [data, setData] = useState(dataList);
  const [selectMultiple, setSelectMultiple] = useState(false);
  const currentItem = useRef(null);

  const handleClick = (e) => {
    if (selectMultiple) {
      e.currentTarget.children[1].classList.toggle("display-none");
    } else {
      const list = e.currentTarget.parentElement.children;
      for (let item of list) {
        item.children[1].classList.add("display-none");
      }
      e.currentTarget.children[1].classList.remove("display-none");
    }
  };

  const handleMultipleClick = () => {
    setSelectMultiple((prev) => !prev);
    const list = currentItem.current.parentElement.children;
    for (let item of list) {
      item.children[1].classList.add("display-none");
    }
  };

  return (
    <>
      <section className="h-full bg-grey ">
        <div className="flex direction-col align-center h-50">
          <h2 className="button ">
            <button onClick={handleMultipleClick}>
              {selectMultiple ? "Disable" : "Enable"} multi selection
            </button>
          </h2>
          <ul className="list-style-none w-700px">
            {data.map((item) => (
              <li
                key={item.id}
                onClick={handleClick}
                className="border radius-5 m-10 p-10 bg-white"
                ref={currentItem}
              >
                <p className="bold font-md flex space-between align-center">
                  <span>{item.question}</span>
                  <span>
                    <img src={arrow} alt="V" className="arrow-img" />
                  </span>
                </p>
                <p className="answer display-none">{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
