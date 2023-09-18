import React, { useEffect, useState } from 'react';
import styles from './HealthFund.module.scss';
import TabLayout from './components/TabLayout/TabLayout';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/user-slice';
import AdminAuthentication from './AdminAuthentication/AdminAuthentication';

const HealthFund: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('userData')!);
    if (storageData) {
      localStorage.removeItem('userData');
      dispatch(setUser({}));
    }
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        {!openModal && <TabLayout />}
        <AdminAuthentication openModal={openModal} closeModal={closeModal} />
      </div>
    </>
  );
};

export default HealthFund;
