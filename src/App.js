import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";

import "./index.css";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Viewport from "./context/Viewport";
import { useState } from "react";
import Intro from "./components/Intro";
import gsap from "gsap";
import useWidth from "./hooks/useWidth";

function App() {
  const [width] = useWidth();
  console.log("width", width);

  const [tl] = useState(gsap.timeline());

  const addTl = (_tl) => {
    if (!_tl || !tl) return;

    tl.add(_tl);
  };

  return (
    <Viewport.Provider value={{ width }}>
      <Intro addTl={addTl} />

      <>
        <header>
          <Nav />
        </header>
        <main className="scroll-snap-point">
          <Landing />
          <About />
          <Services />
          <Gallery />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    </Viewport.Provider>
  );
}

export default App;
