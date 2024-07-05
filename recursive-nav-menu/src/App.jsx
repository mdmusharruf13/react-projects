import menuData from "./menuData";
import MenuList from "./MenuList";

function App() {
  console.log(menuData);
  return (
    <>
      <main>
        <section className="h-full bg-light-grey p-5">
          <MenuList menu={menuData} />
        </section>
      </main>
    </>
  );
}

export default App;
