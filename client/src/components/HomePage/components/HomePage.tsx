import Contacts from "./Contacts/Contacts";
import Information from "./Information/Informatino";
import InformationBoxes from "./InformationBoxes/InformationBoxes";
import OurProfessionals from "./OurProfessionals/OurProfessionals";
import ParallaxComponent from "./Parallax/ParallaxComponent";
import ProvidedServices from "./ProvidedServices/ProvidedServices";
import React from "react";

const HomePage: React.FC = () => (
  <>
    <Contacts />
    <InformationBoxes />
    <Information />
    <ProvidedServices />
    <ParallaxComponent />
    <OurProfessionals />
  </>
);

export default HomePage;
