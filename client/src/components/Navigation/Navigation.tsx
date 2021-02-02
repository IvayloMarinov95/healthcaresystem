import React, { useEffect, useState } from "react";

import MobileNavigation from "./MobileNavigation/MobileNavigation";
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation";

const Navigation: React.FC = () => {
  const [resized, setResize] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 769 || resized) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [mobile, resized]);

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth < 769) {
        setResize(true);
      } else {
        setResize(false);
      }
    };

    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  return mobile ? <MobileNavigation /> : <DesktopNavigation />;
};

export default Navigation;
