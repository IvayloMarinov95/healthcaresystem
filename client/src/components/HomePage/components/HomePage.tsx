import Carousel from "./Carousel/Slider";
import Contacts from "../Contacts/Contacts";
import InformationBoxes from "./InformationBoxes/InformationBoxes";
import React from "react";

const HomePage: React.FC = () => (
  <>
    <Carousel />
    <Contacts />
    <InformationBoxes />
  </>
);

export default HomePage;
