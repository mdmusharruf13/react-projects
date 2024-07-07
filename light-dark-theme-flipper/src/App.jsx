import useLocalStorage from "./useLocalStorage";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <main className="h-full main" data-theme={theme}>
      <section className="flex direction-col justify-center align-center h-inherit">
        <p className="heading text-3xl m-10">Theme Flipper</p>
        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          className="p-5 border radius-5 m-10 cursor-pointer button"
        >
          click me
        </button>
      </section>
    </main>
  );
}

export default App;
