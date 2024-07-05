import { useState } from "react";
import MenuList from "./MenuList";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function MenuItem({ item }) {
  const [displayIcon, setDisplayIcon] = useState({});

  const handleIconClick = (itemLabel) => {
    setDisplayIcon({ ...displayIcon, [itemLabel]: !displayIcon[itemLabel] });
  };

  return (
    <>
      <div className="flex space-between w-300px curson-pointer">
        <p className="text-base">{item.label}</p>
        {item && item.children && item.children.length > 0 ? (
          <span onClick={() => handleIconClick(item.label)}>
            {displayIcon[item.label] ? (
              <FaMinus className="icons" />
            ) : (
              <FaPlus className="icons" />
            )}
          </span>
        ) : null}
      </div>
      {item &&
      item.children &&
      item.children.length > 0 &&
      displayIcon[item.label] ? (
        <MenuList menu={item.children} />
      ) : null}
    </>
  );
}
