import { useState } from "react";
import dataList from "./db/questions";
import arrow from "./images/arrow.png";

function App() {
  const [selected, setSelected] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (currentId) => {
    setSelected(currentId === selected ? null : currentId);
  };

  const handleMultiSelection = (currentId) => {
    const cpyMultiple = [...multiple];
    const currentIdIndex = cpyMultiple.indexOf(currentId);

    if (currentIdIndex === -1) cpyMultiple.push(currentId);
    else cpyMultiple.splice(currentIdIndex, 1);

    setMultiple(cpyMultiple);
  };

  return (
    <div className="accordion w-full bg-grey h-full flex direction-col justify-center align-center">
      <button
        onClick={() => {
          setMultipleSelection(!multipleSelection);
          setMultiple([]);
          handleSingleSelection(null);
        }}
      >
        {multipleSelection ? "Disable" : "Enable"} Multi Selection
      </button>
      <div className="w-700px m-10 flex direction-col justify-center">
        {dataList &&
          dataList.map((data) => (
            <div
              className="flex direction-col bg-white m-5 p-10 border radius-5"
              onClick={
                multipleSelection
                  ? () => handleMultiSelection(data.id)
                  : () => handleSingleSelection(data.id)
              }
            >
              <div className="flex space-between">
                <span className="bold">{data.question}</span>
                <img src={arrow} alt="arrow" className="arrow-img" />
              </div>
              {multipleSelection
                ? multiple.indexOf(data.id) !== -1 && <div>{data.answer}</div>
                : selected === data.id && <div>{data.answer}</div>}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;

// ******************************************************************************************
// import { useRef, useState } from "react";
// import dataList from "./db/questions";
// import arrow from "./images/arrow.png";

// function App() {
//   const [data, setData] = useState(dataList);
//   const [selectMultiple, setSelectMultiple] = useState(false);
//   const currentItem = useRef(null);

//   const handleClick = (e) => {
//     if (selectMultiple) {
//       e.currentTarget.children[1].classList.toggle("display-none");
//     } else {
//       const list = e.currentTarget.parentElement.children;
//       for (let item of list) {
//         item.children[1].classList.add("display-none");
//       }
//       e.currentTarget.children[1].classList.remove("display-none");
//     }
//   };

//   const handleMultipleClick = () => {
//     setSelectMultiple((prev) => !prev);
//     const list = currentItem.current.parentElement.children;
//     for (let item of list) {
//       item.children[1].classList.add("display-none");
//     }
//   };

//   return (
//     <>
//       <section className="h-full bg-grey ">
//         <div className="flex direction-col align-center h-50">
//           <h2 className="button ">
//             <button onClick={handleMultipleClick}>
//               {selectMultiple ? "Disable" : "Enable"} multi selection
//             </button>
//           </h2>
//           <ul className="list-style-none w-700px">
//             {data.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={handleClick}
//                 className="border radius-5 m-10 p-10 bg-white"
//                 ref={currentItem}
//               >
//                 <p className="bold font-md flex space-between align-center">
//                   <span>{item.question}</span>
//                   <span>
//                     <img src={arrow} alt="V" className="arrow-img" />
//                   </span>
//                 </p>
//                 <p className="answer display-none">{item.answer}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </>
//   );
// }

// export default App;
