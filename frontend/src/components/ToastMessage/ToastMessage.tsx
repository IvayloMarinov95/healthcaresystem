import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import styles from './ToastMessage.module.scss';
import { setToast } from '../../features/toast/toast-slice';

const ToastMessage = () => {
  const toast = useAppSelector((state: RootState) => state.toast.value);
  const [showToast, setShowToast] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    let hideAlert;
    if (Object.keys(toast).length > 0) {
      setShowToast(true);
      hideAlert = setTimeout(() => {
        setShowToast(false);
        // @ts-ignore
        dispatch(setToast({}));

        // @ts-ignore
        return () => clearTimeout(hideAlert);
      }, 3000);
    } else {
      setShowToast(false);
    }

    // @ts-ignore
    return () => clearTimeout(hideAlert);
  }, [toast]);

  return (
    <div className={styles.toast}>
      <Alert
        show={showToast}
        // @ts-ignore
        variant={toast.color}
      >
        {/* @ts-ignore */}
        {toast.message}
      </Alert>
    </div>
  );
};

export default ToastMessage;
