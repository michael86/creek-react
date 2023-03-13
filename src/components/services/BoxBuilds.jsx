import { useContext } from "react";
import Viewport from "../../context/Viewport";
import BoxBuildDesktop from "./desktop/BoxBuildDesktop";
import BoxBuildMobile from "./mobile/BoxBuildMobile";

const PcbAssembly = ({ content, onClick, active }) => {
  const { width } = useContext(Viewport);

  return (
    <>
      {width >= 991 ? (
        <BoxBuildDesktop content={content} onClick={onClick} active={active} />
      ) : (
        <BoxBuildMobile content={content} />
      )}
    </>
  );
};

export default PcbAssembly;
