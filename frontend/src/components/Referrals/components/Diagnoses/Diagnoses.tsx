import React from 'react';
import SquareInputs from '../SquareInputs/SquareInputs';
import styles from './Diagnoses.module.scss';

type Props = {
  primaryDiagnosis: string;
  handlePrimaryDiagnosisChange: (fieldValue: string) => void;
  accompanyingIllness1: string;
  handleAccompanyingIllnes1Change: (fieldValue: string) => void;
  accompanyingIllness2: string;
  handleAccompanyingIllnes2Change: (fieldValue: string) => void;
};

const Diagnoses: React.FC<Props> = ({
  primaryDiagnosis,
  handlePrimaryDiagnosisChange,
  accompanyingIllness1,
  handleAccompanyingIllnes1Change,
  accompanyingIllness2,
  handleAccompanyingIllnes2Change,
}) => (
  <div className={styles.diagnosisContainer}>
    <div className={styles.diagnosisText}>Diagnoses:</div>
    <div>
      <div className={styles.icd}>
        {/* international classification of diseases(международен класификатор на болести) */}
        <div>ICD</div>
        <div>
          <SquareInputs
            numberOfInputs={8}
            fieldValue={primaryDiagnosis}
            containerClass={styles.diagnosisSquares}
            characterClass={styles.characters}
            handleChange={handlePrimaryDiagnosisChange}
          />
          <label className={styles.inputLabel}>Primary Diagnosis</label>
        </div>
      </div>
      <div className={styles.icd}>
        <div>ICD</div>
        <div>
          <SquareInputs
            numberOfInputs={8}
            fieldValue={accompanyingIllness1}
            containerClass={styles.diagnosisSquares}
            characterClass={styles.characters}
            handleChange={handleAccompanyingIllnes1Change}
          />
          <label className={styles.inputLabel}>Accompanying Illness</label>
        </div>
      </div>
      <div className={styles.icd}>
        <div>ICD</div>
        <div>
          <SquareInputs
            numberOfInputs={8}
            fieldValue={accompanyingIllness2}
            containerClass={styles.diagnosisSquares}
            characterClass={styles.characters}
            handleChange={handleAccompanyingIllnes2Change}
          />
          <label className={styles.inputLabel}>Accompanying Illness</label>
        </div>
      </div>
    </div>
  </div>
);

export default Diagnoses;
