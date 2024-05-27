import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { FaAngleDown, FaAngleRight, FaCheck, FaTimes } from 'react-icons/fa';
import styles from '../../HealthFund.module.scss';
import Search from '../../../Search/Search';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import axios from 'axios';
import { reasons, status } from '../../../../lib/constants';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAppDispatch } from '../../../../app/hooks';

const ReferralsApplication = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [referrals, setReferrals] = useState<Array<object>>([]);
  const [filteredList, setFilteredList] = useState<Array<object>>([]);
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

  const getReferrals = async () => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/referrals';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleStatusChange = async (status: string, id: string) => {
    dispatch(setIsLoading(true));
    const url = 'http://localhost:5000/api/referrals/' + id;
    await axios
      .patch(url, { status })
      .then(() => {
        getReferrals();
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <>
      <Search input={input} handleChange={handleChange} />
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
                        Referred doctor: {/* @ts-ignore */}
                        <b className={styles.data}>{referral.doctorFullName}</b>
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
                    <div className={styles.referralBtns}>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleStatusChange(
                            status.ACCEPTED,
                            // @ts-ignore
                            referral._id
                          )
                        }
                      >
                        <FaCheck />
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleStatusChange(
                            status.DECLINED,
                            // @ts-ignore
                            referral._id
                          )
                        }
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  )}
                  {/* @ts-ignore */}
                  {referral.status === status.ACCEPTED && (
                    <div>
                      <FaCheckCircle className={styles.accepted} /> Accepted
                    </div>
                  )}
                  {/* @ts-ignore */}
                  {referral.status === status.DECLINED && (
                    <div>
                      <FaTimesCircle className={styles.declined} /> Declined
                    </div>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </>
  );
};

export default ReferralsApplication;
