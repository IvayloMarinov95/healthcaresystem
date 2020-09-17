import React, { useEffect } from "react";

import Contacts from "./Contacts/Contacts";
import Information from "./Information/Informatino";
import InformationBoxes from "./InformationBoxes/InformationBoxes";
import OurProfessionals from "./OurProfessionals/OurProfessionals";
import ParallaxComponent from "./Parallax/ParallaxComponent";
import ProvidedServices from "./ProvidedServices/ProvidedServices";

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Contacts />
      <InformationBoxes />
      <Information />
      <ProvidedServices />
      <ParallaxComponent />
      <OurProfessionals />
    </>
  );
};

export default HomePage;
