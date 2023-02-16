import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";

import "./index.css";

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="scroll-snap-point">
        <Landing />
        <About />
      </main>
    </>
  );
}

export default App;
