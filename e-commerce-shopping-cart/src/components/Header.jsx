import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../utils/GlobalStorage";

export default function Header() {
  const { cartData } = useContext(GlobalContext);

  return (
    <>
      <header className="flex justify-between m-3 ">
        <div>
          <Link className="text-3xl font-bold text-green-700" to={"/"}>
            EcoMart
          </Link>
        </div>
        <div className="flex flex-no-wrap gap-1">
          <Link
            className="text-lg font-medium  px-3 py-1 rounded hover:bg-slate-100"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="text-lg font-medium px-3 py-1 rounded hover:bg-slate-100"
            to={"cart"}
          >
            Cart {cartData.length}
          </Link>
        </div>
      </header>
    </>
  );
}
