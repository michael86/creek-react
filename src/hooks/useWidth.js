import { useRef, useState, useEffect } from "react";

const useWidth = () => {
  const timer = useRef();
  const [width, setWidth] = useState(window.innerWidth);

  const _handleWindowResize = () => {
    if (timer.current) {
      clearTimeout(timer.current); //if an user try to resize the screen again, we reset timer (no triggering state update logic)
    }
    timer.current = setTimeout(() => {
      setWidth(window.innerWidth);
    }, 500); //delay state change after 0.5s
  };

  useEffect(() => {
    window.addEventListener("resize", _handleWindowResize);
    return () => window.removeEventListener("resize", _handleWindowResize);
  }, []);

  return [width, setWidth];
};

export default useWidth;
