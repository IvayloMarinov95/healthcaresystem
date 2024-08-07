import React, { useEffect, useState } from 'react';
import KitchenSink from '../HomePage/components/Cards/KitchenSink/KitchenSink';
import Search from '../Search/Search';
import styles from './Patients.module.scss';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import axios from 'axios';
import { useAppDispatch } from '../../app/hooks';

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Array<object>>([]);
  const [filteredList, setFilteredList] = useState<Array<object>>([]);
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event?.target.value);

  const getPatients = async () => {
    dispatch(setIsLoading(true));
    const url =
      'http://localhost:5000/api/users/userByRole/' +
      '64f5f6963741f138f0d144e6';

    await axios
      .get(url)
      .then((response) => {
        if (response?.data) {
          setPatients(response.data.users);
        }
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  useEffect(() => {
    getPatients();
  }, []);

  useEffect(() => {
    if (input) {
      const filter = patients?.filter((item) =>
        // @ts-ignore
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredList(filter);
    } else {
      setFilteredList(patients);
    }
  }, [input, patients]);

  return (
    <>
      <div className={styles.container}>
        <Search input={input} handleChange={handleChange} />
        <div className={styles.patients}>
          <div className={styles.cards}>
            {filteredList?.map((patient) => (
              // @ts-ignore
              <div key={patient.email}>
                <KitchenSink
                  handleClick={() => console.log('opa 6')}
                  image={
                    // @ts-ignore
                    patient.personalInformation.photo || ''
                  }
                  // @ts-ignore
                  title={'Name: ' + patient.name}
                  // @ts-ignore
                  text={'Occupation: ' + patient.personalInformation.occupation}
                  item1="The branch of medicine concerned with the development, care, and diseases of babies and children."
                  // @ts-ignore
                  item2={'Age: ' + patient.personalInformation.age}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Patients;
