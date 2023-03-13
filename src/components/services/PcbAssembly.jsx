import { useContext } from "react";
import Viewport from "../../context/Viewport";
import PcbAssemblyDesktop from "./desktop/PcbAssemblyDesktop";
import PcbAssemblyMobile from "./mobile/PcbAssemblyMobile";

const PcbAssembly = ({ content, onClick, active }) => {
  const { width } = useContext(Viewport);

  return (
    <>
      {width >= 991 ? (
        <PcbAssemblyDesktop content={content} onClick={onClick} active={active} />
      ) : (
        <PcbAssemblyMobile content={content} />
      )}
    </>
  );
};

export default PcbAssembly;
