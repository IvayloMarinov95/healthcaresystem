import DoctorContacts from './Contacts/DoctorContacts';
import KitchenSink from '../Cards/KitchenSink/KitchenSink';
import React, { useEffect, useState } from 'react';
import Title from '../../../Title/Title';
import styles from './OurProfessionals.module.scss';
import { setIsLoading } from '../../../../features/spinner/isLoading-slice';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const OurProfessionals: React.FC = () => {
  const [doctors, setDoctors] = useState<Array<object>>([]);
  const history = useHistory();
  const descriptions = [
    'The branch of medicine concerned with the development, care, and diseases of babies and children.',
    'Cardiology deals with the disorders of the heart as well as some parts of the circulatory system',
    'Rehabilitation treatment services intended to restore your body to their highest degree of performance.',
    'The branch of medicine concerned with the development, care, and diseases of babies and children.',
  ];

  const getDoctors = async () => {
    setIsLoading(true);
    const url =
      'http://localhost:5000/api/users/doctors/' + '64ec71860b9e3c40588277d3';

    await axios
      .get(url)
      .then((response) => {
        if (response?.data) {
          setDoctors(response.data.users);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleSeeMoreClick = () => {
    history.push('/doctors');
  };

  return (
    <div className={styles.container}>
      <Title tinyHeader="Professionals" header="Some of our doctors" />
      <div className={styles.cards}>
        {doctors?.map((doctor, index) => (
          // @ts-ignore
          <div key={doctor.email}>
            <KitchenSink
              // @ts-ignore
              key={doctor.email}
              // @ts-ignore
              image={doctor?.personalInformation?.photo}
              // @ts-ignore
              title={'Dr. ' + doctor?.name}
              // @ts-ignore
              text={doctor.personalInformation?.occupation}
              item1={descriptions[index]}
              item2={
                <DoctorContacts
                  // @ts-ignore
                  phone={doctor?.personalInformation?.phone}
                  // @ts-ignore
                  email={doctor?.email}
                />
              }
            />
          </div>
        ))}
      </div>
      <div className={styles.moreBtn}>
        <Button variant="link" onClick={() => handleSeeMoreClick()}>
          See more...
        </Button>
      </div>
    </div>
  );
};

export default OurProfessionals;
