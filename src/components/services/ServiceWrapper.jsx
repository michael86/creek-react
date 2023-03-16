import { useContext } from "react";
import Viewport from "../../context/Viewport";

import PcbFabricationMobile from "./mobile/PcbFabricationMobile";
import PcbDesignMobile from "./mobile/PcbDesignMobile";
import BoxBuildMobile from "./mobile/BoxBuildMobile";
import PcbAssemblyMobile from "./mobile/PcbAssemblyMobile";

import uuid from "react-native-uuid";
import ServiceCard from "./ServiceCard";

const services = [
  { name: "design", mobile: PcbDesignMobile },
  { name: "fabrication", mobile: PcbFabricationMobile },
  { name: "assembly", mobile: PcbAssemblyMobile },
  { name: "boxBuild", mobile: BoxBuildMobile },
];

const ServiceWrapper = ({ content, ...props }) => {
  const { width } = useContext(Viewport);

  return (
    <>
      {services.map((service) => {
        const Desktop = service.desktop;
        const Mobile = service.mobile;
        return width >= 991 ? (
          <ServiceCard key={uuid.v4()} content={content[service.name]} {...props} />
        ) : (
          // <Desktop key={uuid.v4()} content={content[service.name]} {...props} />
          <Mobile key={uuid.v4()} content={content[service.name]} {...props} />
        );
      })}
    </>
  );
};

export default ServiceWrapper;
