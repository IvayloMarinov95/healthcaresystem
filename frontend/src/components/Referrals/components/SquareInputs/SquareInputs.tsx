import React, { useEffect, useState } from 'react';
import VerificationInput from 'react-verification-input';

interface Props {
  numberOfInputs: number;
  fieldValue: string;
  characterClass?: string;
  containerClass?: string;
  handleChange?: (fieldValue: string) => void;
}

const SquareInputs: React.FC<Props> = ({
  numberOfInputs,
  fieldValue,
  containerClass,
  characterClass,
  handleChange,
}) => {
  return (
    <div>
      <VerificationInput
        length={numberOfInputs}
        value={fieldValue}
        placeholder=""
        validChars="A-Za-z0-9"
        classNames={{ container: containerClass, character: characterClass }}
        onChange={handleChange}
      />
    </div>
  );
};

export default SquareInputs;
