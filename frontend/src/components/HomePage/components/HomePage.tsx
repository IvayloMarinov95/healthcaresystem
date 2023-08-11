import React from "react";

import Contacts from "./Contacts/Contacts";
import Information from "./Information/Information";
import InformationBoxes from "./InformationBoxes/InformationBoxes";
import OurProfessionals from "./OurProfessionals/OurProfessionals";
import ParallaxComponent from "./Parallax/ParallaxComponent";
import ProvidedServices from "./ProvidedServices/ProvidedServices";

const HomePage: React.FC = () => {
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
