import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import styles from './ImageUpload.module.scss';

interface Props {
  id?: string;
  onInput: (file: any) => void;
}

const ImageUpload: React.FC<Props> = ({ id, onInput }) => {
  const [file, setFile] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string | null>('');
  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: any) => {
    let pickedFile;
    if (event.target?.files?.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    onInput(pickedFile);
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
    onInput(null);
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={pickedHandler}
      />
      <div className={styles.imgContainer}>
        {previewUrl && (
          <div className={styles.imgContainer}>
            <img src={previewUrl} alt="Preview" className={styles.img} />
            <div className={styles.minusBtn}>
              <Button
                variant="danger"
                className={styles.btn}
                onClick={removeImage}
              >
                <FaMinus />
              </Button>
            </div>
          </div>
        )}
        {!previewUrl && (
          <div className={styles.btnDiv}>
            <Button
              variant="primary"
              className={styles.btn}
              onClick={pickImageHandler}
            >
              <FaPlus />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
