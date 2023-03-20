import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";

import "./index.css";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Viewport from "./context/Viewport";
import useWidth from "./hooks/useWidth";
import { useState } from "react";

function App() {
  const [width] = useWidth();

  const [sections, setSections] = useState({});

  const addRef = (ref) => {
    sections[ref.current.id] = ref.current;
    setSections(sections);
  };
  const [activeContent, setActiveContent] = useState("design");

  return (
    <Viewport.Provider value={{ width }}>
      <header>
        <Nav sections={sections} />
      </header>
      <main>
        <Landing
          addRef={addRef}
          sections={sections}
          activeContent={activeContent}
          setActiveContent={setActiveContent}
        />
        <About addRef={addRef} />
        <Services
          addRef={addRef}
          activeContent={activeContent}
          setActiveContent={setActiveContent}
        />
        <Gallery addRef={addRef} />
      </main>
      <footer>
        <Footer />
      </footer>
    </Viewport.Provider>
  );
}

export default App;
