import { useContext } from "react";
import Viewport from "../../context/Viewport";
import PcbDesignDesktop from "./desktop/PcbDesignDesktop";
import PcbDesignMobile from "./mobile/PcbDesignMobile";

const PcbDesign = ({ content, onClick, active }) => {
  const { width } = useContext(Viewport);

  return (
    <>
      {width >= 991 ? (
        <PcbDesignDesktop content={content} onClick={onClick} active={active} />
      ) : (
        <PcbDesignMobile content={content} />
      )}
    </>
  );
};

export default PcbDesign;
