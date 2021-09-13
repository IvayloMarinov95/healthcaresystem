import { Parallax } from "react-parallax";
import React from "react";
import parallaxImage from "../../../../assets/2parallax.jpg";
import styles from "./Parallax.module.scss";

const ParallaxComponent: React.FC = () => (
  <Parallax
    bgImage={parallaxImage}
    className={styles.parallax}
    strength={270}
  ></Parallax>
);

export default ParallaxComponent;
