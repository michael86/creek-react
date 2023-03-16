import { useContext } from "react";
import Viewport from "../../context/Viewport";
import PcbFabricationDesktop from "./desktop/PcbFabricationDesktop";
import PcbFabricationMobile from "./mobile/PcbFabricationMobile";
import PcbDesignDesktop from "./desktop/PcbDesignDesktop";
import PcbDesignMobile from "./mobile/PcbDesignMobile";
import BoxBuildDesktop from "./desktop/BoxBuildDesktop";
import BoxBuildMobile from "./mobile/BoxBuildMobile";
import PcbAssemblyDesktop from "./desktop/PcbAssemblyDesktop";
import PcbAssemblyMobile from "./mobile/PcbAssemblyMobile";
import uuid from "react-native-uuid";

const services = [
  { name: "design", desktop: PcbDesignDesktop, mobile: PcbDesignMobile },
  { name: "fabrication", desktop: PcbFabricationDesktop, mobile: PcbFabricationMobile },
  { name: "assembly", desktop: PcbAssemblyDesktop, mobile: PcbAssemblyMobile },
  { name: "boxBuild", desktop: BoxBuildDesktop, mobile: BoxBuildMobile },
];

const ServiceWrapper = ({ content, ...props }) => {
  const { width } = useContext(Viewport);

  return (
    <>
      {services.map((service) => {
        const Desktop = service.desktop;
        const Mobile = service.mobile;
        return width >= 991 ? (
          <Desktop key={uuid.v4()} content={content[service.name]} {...props} />
        ) : (
          <Mobile key={uuid.v4()} content={content[service.name]} {...props} />
        );
      })}
    </>
  );
};

export default ServiceWrapper;
