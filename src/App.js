import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Viewport from "./context/Viewport";
import "./index.css";

function App() {
  return (
    <Viewport.Provider
      value={{
        width: window.visualViewport.width, //using innerWidth || innerHeight returned the wrong pxs due to dev tools being toxic and taking pinchzoom into equation
        height: window.visualViewport.height,
      }}
    >
      <header>
        <Nav />
      </header>
      <main>
        <Landing />
      </main>
    </Viewport.Provider>
  );
}

export default App;
