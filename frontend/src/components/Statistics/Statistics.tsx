import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styles from './Statistics.module.scss';

const Statistics: React.FC = () => {
  const [medicationsList, setMedicationsList] = useState<Array<object>>([]);
  const [diseasesList, setDiseasesList] = useState<Array<object>>([]);

  useEffect(() => {
    axios
      .get(
        'http://localhost:5000/api/prescriptions/getFiveMostFrequentMedications'
      )
      .then((response) => setMedicationsList(response.data))
      .catch((error) => console.log('error: ', error));
  }, []);

  useEffect(() => {
    axios
      .get(
        'http://localhost:5000/api/prescriptions/getFiveMostFrequentDiseases'
      )
      .then((response) => setDiseasesList(response.data))
      .catch((error) => console.log('error: ', error));
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>
          <h3>5 most commonly prescribed drugs</h3>
        </div>
        <div>
          <PieChart
            data={[
              { title: 'One', value: 30, color: '#E38627' },
              { title: 'Two', value: 25, color: '#C13C37' },
              { title: 'Three', value: 20, color: '#6A2135' },
              { title: 'Four', value: 15, color: '#46216a' },
              { title: 'Five', value: 10, color: '#213f6a' },
            ]}
          />
        </div>
      </div>
      <div className={styles.diseases}>
        <div className={styles.title}>
          <h3>Most common diseases</h3>
        </div>
        <div>
          <PieChart
            data={[
              { title: 'One', value: 30, color: '#E38627' },
              { title: 'Two', value: 25, color: '#C13C37' },
              { title: 'Three', value: 20, color: '#6A2135' },
              { title: 'Four', value: 15, color: '#46216a' },
              { title: 'Five', value: 10, color: '#213f6a' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
