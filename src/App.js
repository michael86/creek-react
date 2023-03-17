import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";

import "./index.css";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Viewport from "./context/Viewport";
import useWidth from "./hooks/useWidth";

function App() {
  const [width] = useWidth();

  return (
    <Viewport.Provider value={{ width }}>
      <header>
        <Nav />
      </header>
      <main>
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
