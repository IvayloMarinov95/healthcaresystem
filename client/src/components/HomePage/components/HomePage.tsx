import Carousel from "./Carousel/Slider";
import Contacts from "../Contacts/Contacts";
import Information from "./Information/Informatino";
import InformationBoxes from "./InformationBoxes/InformationBoxes";
import ProvidedServices from "./ProvidedServices/ProvidedServices";
import React from "react";

const HomePage: React.FC = () => (
  <>
    <Carousel />
    <Contacts />
    <InformationBoxes />
    <Information />
    <ProvidedServices />
  </>
);

export default HomePage;
