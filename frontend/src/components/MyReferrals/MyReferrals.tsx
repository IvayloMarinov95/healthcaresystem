import React, { useEffect, useState } from 'react';
import styles from './MyReferrals.module.scss';
import Search from '../Search/Search';
import { Accordion, Card } from 'react-bootstrap';
import {
  FaAngleRight,
  FaAngleDown,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { reasons, status } from '../../lib/constants';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

const MyReferrals: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [referrals, setReferrals] = useState<Array<object>>([]);
  const [filteredList, setFilteredList] = useState<Array<object>>([]);
  const user = useAppSelector((state: RootState) => state.user.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getReferrals();
  }, []);

  useEffect(() => {
    if (input) {
      const filter = referrals?.filter((item) =>
        // @ts-ignore
        item.referralNumber.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredList(filter);
    } else {
      setFilteredList(referrals);
    }
  }, [input, referrals]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    setToggle(!toggle);
  };

  const getReferrals = async () => {
    dispatch(setIsLoading(true));
    // @ts-ignore
    const url = 'http://localhost:5000/api/referrals/' + user.userId;
    await axios
      .get(url)
      .then((response) => {
        if (response?.data?.referrals) {
          setReferrals(response.data.referrals);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>My Referrals</h3>
      </div>
      <div className={styles.search}>
        <Search input={input} handleChange={handleChange} />
      </div>
      {filteredList?.length > 0 ? (
        <div>
          <Accordion defaultActiveKey="0" className={styles.accordions}>
            {filteredList?.length > 0 &&
              filteredList?.map((referral) => (
                // @ts-ignore
                <Card key={referral._id}>
                  <Accordion.Toggle
                    as={Card.Header}
                    // @ts-ignore
                    eventKey={referral._id}
                    className={styles.cardHeader}
                    onClick={() => handleClick()}
                  >
                    <div>{!toggle ? <FaAngleRight /> : <FaAngleDown />}</div>
                    <div>
                      {/* @ts-ignore */}
                      Referral № <b>{referral.referralNumber}</b>
                    </div>
                  </Accordion.Toggle>
                  {/* @ts-ignore */}
                  <Accordion.Collapse eventKey={referral._id}>
                    <Card.Body className={styles.collapse}>
                      <div className={styles.referralsDataContainer}>
                        <div className={styles.referralsDataSections}>
                          <div className={styles.dataDiv}>
                            Patient:{' '}
                            <b className={styles.data}>
                              {/* @ts-ignore */}
                              {referral.patientFullName}
                            </b>
                          </div>
                          <div className={styles.dataDiv}>
                            Patient Id:{' '}
                            <b className={styles.data}>
                              {/* @ts-ignore */}
                              {referral.patientPersonalId}
                            </b>
                          </div>
                        </div>
                        <div className={styles.referralsDataSections}>
                          <div className={styles.dataDiv}>
                            Created By:{' '}
                            <b className={styles.data}>
                              {/* @ts-ignore */}
                              {referral.referringDoctorFullName}
                            </b>
                          </div>
                          <div className={styles.dataDiv}>
                            Referred doctor:
                            <b className={styles.data}>
                              {/* @ts-ignore */}
                              {referral.doctorFullName}
                            </b>
                          </div>
                        </div>
                        <div>
                          <div>
                            Reason:{' '}
                            <b className={styles.data}>
                              {/* @ts-ignore */}
                              {reasons[referral.reason]}
                            </b>
                          </div>
                        </div>
                      </div>
                      {/* @ts-ignore */}
                      {referral.status === status.PENDING && (
                        <div className={styles.referralBtns}>Pending</div>
                      )}
                      {/* @ts-ignore */}
                      {referral.status === status.ACCEPTED && (
                        <div className={styles.referralBtns}>
                          <FaCheckCircle className={styles.accepted} /> Accepted
                        </div>
                      )}
                      {/* @ts-ignore */}
                      {referral.status === status.DECLINED && (
                        <div className={styles.referralBtns}>
                          <FaTimesCircle className={styles.declined} /> Declined
                        </div>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        </div>
      ) : (
        <div className={styles.title}>
          <h3>There are no assigned referrals!</h3>
        </div>
      )}
    </div>
  );
};

export default MyReferrals;
