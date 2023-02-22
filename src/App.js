import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";

import "./index.css";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="scroll-snap-point">
        <Landing />
        <About />
        <Services />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
