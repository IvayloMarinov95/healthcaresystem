import React, { useEffect, useState } from 'react';

import Chief from './Chief/Chief';
import DoctorContacts from '../HomePage/components/OurProfessionals/Contacts/DoctorContacts';
import KitchenSink from '../HomePage/components/Cards/KitchenSink/KitchenSink';
import Title from '../Title/Title';
import styles from './Doctors.module.scss';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import axios from 'axios';
import Search from '../Search/Search';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Array<object>>([]);
  const [filteredList, setFilteredList] = useState<Array<object>>([]);
  const [input, setInput] = useState<string>('');

  const getDoctors = async () => {
    setIsLoading(true);
    const url =
      'http://localhost:5000/api/users/userByRole/' +
      '64ec71860b9e3c40588277d3';

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

  useEffect(() => {
    if (input) {
      // @ts-ignore
      const filter = doctors?.filter((item) => item.name.includes(input));
      setFilteredList(filter);
    } else {
      setFilteredList(doctors);
    }
  }, [input, doctors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Title tinyHeader="Professionals" header="Chief of medicine" />
      <Chief />
      <div className={styles.doctors}>
        <Title tinyHeader="Professionals" header="Doctors" />
        <div className={styles.search}>
          <Search input={input} handleChange={handleChange} />
        </div>
        <div className={styles.cards}>
          {filteredList?.map((doctor) => (
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
                item1="The branch of medicine concerned with the development, care, and diseases of babies and children."
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
      </div>
    </div>
  );
};

export default Doctors;
