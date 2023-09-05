import React, { useEffect, useState } from 'react';

import MobileNavigation from './MobileNavigation/MobileNavigation';
import DesktopNavigation from './DesktopNavigation/DesktopNavigation';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../features/user/user-slice';
import { setIsLoading } from '../../features/spinner/isLoading-slice';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
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

    window.addEventListener('resize', handleMobile);
    return () => {
      window.removeEventListener('resize', handleMobile);
    };
  }, []);

  const logout = () => {
    dispatch(setIsLoading(true));
    localStorage.removeItem('userData');
    dispatch(setUser({}));
    dispatch(setIsLoading(false));
  };

  return mobile ? (
    <MobileNavigation logout={logout} />
  ) : (
    <DesktopNavigation logout={logout} />
  );
};

export default Navigation;
