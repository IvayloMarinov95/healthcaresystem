import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import medicalClinic from '../../../assets/medicalClinicLogo.png';
import styles from '../Navigation.module.scss';
import Hamburger from 'hamburger-react';
import { Button } from 'react-bootstrap';
import AuthenticationModal from '../AuthenticationModal/AuthenticationModal';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  logout: (e: React.MouseEvent<HTMLElement>) => void;
}

const MobileNavigation: React.FC<Props> = ({ logout }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state: RootState) => state.user.value);
  const roles = useAppSelector((state: RootState) => state.roles.value);
  // @ts-ignore
  const userRole = roles.filter((item) => item._id === user.role)[0]?.role;
  const userIsLoggedIn = user && Object.keys(user).length > 1 ? true : false;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
      setUsername('');
    };
  }, [openModal]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = (toggle: string) => {
    setOpenModal(true);
    setToggle(toggle);
  };

  const handleModalContentChange = (toggle: string) => {
    setEmail('');
    setPassword('');
    setUsername('');
    setToggle(toggle);
  };

  const handleHide = () => {
    setOpenModal(false);
  };

  const handleMyProfileClick = () => {
    history.push('/myProfile');
  };

  return (
    <div ref={ref}>
      <div className={styles.containerScroll}>
        <Link to="/" className={styles.logoContainer}>
          <img src={medicalClinic} alt="" className={styles.medicalClinic} />
        </Link>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          direction="right"
          color="white"
        />
      </div>
      {isOpen && (
        <div className={styles.mobileTabsContainer}>
          <Link to="/" className={styles.mobileTabs}>
            Home
          </Link>
          <Link to="/departments" className={styles.mobileTabs}>
            Departments
          </Link>
          <Link to="/doctors" className={styles.mobileTabs}>
            Doctors
          </Link>
          {user && userRole === 'doctor' && (
            <Link to="/patients" className={styles.mobileTabs}>
              Patients
            </Link>
          )}
          <Link to="/about" className={styles.mobileTabs}>
            About
          </Link>
          {!userIsLoggedIn && (
            <>
              <Button
                variant="secondary"
                className={styles.mobileBtn}
                onClick={() => handleClick('signIn')}
              >
                Sign In
              </Button>
              <Button
                variant="dark"
                className={styles.mobileBtn}
                onClick={() => handleClick('signUp')}
              >
                Sign Up
              </Button>
            </>
          )}
          {userIsLoggedIn && (
            <div>
              <Button
                variant="dark"
                className={styles.mobileBtn}
                onClick={handleMyProfileClick}
              >
                My Profile
              </Button>
              <Button
                variant="dark"
                className={styles.mobileBtn}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
      <AuthenticationModal
        openModal={openModal}
        handleHide={handleHide}
        toggle={toggle}
        username={username}
        email={email}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleModalContentChange={handleModalContentChange}
      />
    </div>
  );
};

export default MobileNavigation;
