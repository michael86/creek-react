import BoxBuilds from "./BoxBuilds";
import PcbAssembly from "./PcbAssembly";

import PcbDesign from "./PcbDesign";
import PcbFabrication from "./PcbFabrication";

const Services = () => {
  return (
    <>
      <PcbDesign />
      <PcbFabrication />
      <PcbAssembly />
      <BoxBuilds />
    </>
  );
};

export default Services;
