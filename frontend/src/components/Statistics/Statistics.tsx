import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Statistics.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { setIsLoading } from '../../features/spinner/isLoading-slice';

// @ts-ignore
const medicationsData = [['Medications', 'Count']];

const Statistics: React.FC = () => {
  const [medicationsList, setMedicationsList] = useState<Array<object>>([]);
  const [diseasesList, setDiseasesList] = useState<Array<object>>([]);
  const [medicationsData, setMedicationsData] = useState<any>([
    ['Medication', 'Count'],
  ]);
  const [diseasesData, setDiseasesData] = useState<any>([['Disease', 'Count']]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getFiveMostFrequentMedications();
    getFiveMostFrequentDiseases();
  }, []);

  const getFiveMostFrequentMedications = () => {
    dispatch(setIsLoading(true));
    axios
      .get(
        'http://localhost:5000/api/prescriptions/getFiveMostFrequentMedications'
      )
      .then((response) => {
        setMedicationsList(response.data);
        // @ts-ignore
        response.data?.forEach((element) => {
          const newElement = [element.name, element.count];
          setMedicationsData((prev: any) => [...prev, newElement]);
        });
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  const getFiveMostFrequentDiseases = () => {
    dispatch(setIsLoading(true));
    axios
      .get(
        'http://localhost:5000/api/prescriptions/getFiveMostFrequentDiseases'
      )
      .then((response) => {
        setDiseasesList(response.data);
        // @ts-ignore
        response.data?.forEach((element) => {
          const newElement = [element.nameEn, element.count];
          setDiseasesData((prev: any) => [...prev, newElement]);
        });
      })
      .catch((error) => console.log('error: ', error))
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Statistics</h3>
      </div>
      <div>
        <Chart
          chartType="PieChart"
          // @ts-ignore
          data={medicationsData}
          options={{
            title: 'Most commonly prescribed medications',
            is3D: true,
          }}
          width={'100%'}
          height={'600px'}
        />
        <Chart
          chartType="PieChart"
          // @ts-ignore
          data={diseasesData}
          options={{ title: 'Most common diseases', is3D: true }}
          width={'100%'}
          height={'600px'}
        />
      </div>
    </div>
  );
};

export default Statistics;
