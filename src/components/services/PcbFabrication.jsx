import { useContext } from "react";
import Viewport from "../../context/Viewport";
import PcbFabricationDesktop from "./desktop/PcbFabricationDesktop";
import PcbFabricationMobile from "./mobile/PcbFabricationMobile";

const PcbDesign = ({ content, onClick, active }) => {
  const { width } = useContext(Viewport);

  return (
    <>
      {width >= 991 ? (
        <PcbFabricationDesktop content={content} onClick={onClick} active={active} />
      ) : (
        <PcbFabricationMobile content={content} />
      )}
    </>
  );
};

export default PcbDesign;
