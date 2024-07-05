import MenuItem from "./MenuItem";

export default function MenuList({ menu = [] }) {
  return (
    <>
      <ul className="m-5">
        {menu && menu.length
          ? menu.map((item) => (
              <li key={item.label} className="list-style-none">
                <MenuItem item={item} />
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
