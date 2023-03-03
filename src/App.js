import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";

import "./index.css";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Viewport from "./context/Viewport";
import { useEffect, useState, useRef } from "react";

function App() {
  //using innerWidth || innerHeight returned the wrong pxs due to dev tools being toxic and taking pinchzoom into equation
  const [width, setWidth] = useState(window.innerWidth);

  const timer = useRef();

  const handleWindowResize = () => {
    if (timer.current) {
      clearTimeout(timer.current); //if an user try to resize the screen again, we reset timer (no triggering state update logic)
    }
    timer.current = setTimeout(() => {
      setWidth(window.innerWidth);
    }, 500); //delay state change after 0.5s
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Viewport.Provider value={{ width }}>
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
    </Viewport.Provider>
  );
}

export default App;
