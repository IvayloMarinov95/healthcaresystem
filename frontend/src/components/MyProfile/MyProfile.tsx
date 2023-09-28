import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageUpload from '../ImageUpload/ImageUpload';
import styles from './MyProfile.module.scss';
import { setIsLoading } from '../../features/spinner/isLoading-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import axios from 'axios';
import { FaMinus } from 'react-icons/fa';
import { setToast } from '../../features/toast/toast-slice';

const MyProfile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [department, SetDepartment] = useState<string>('');
  const [photo, setPhoto] = useState<Blob | null>();
  const [gender, setGender] = useState<string>('');
  const [databasePath, setDatabasePath] = useState<string>('');
  const roles = useAppSelector((state: RootState) => state.roles.value);
  const user = useAppSelector((state: RootState) => state.user.value);
  const doctorRole = roles?.filter((item) => item.role === 'doctor')[0];
  // @ts-ignore
  const isDoctor = doctorRole?._id === user?.role;
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    if (user) {
      setIsLoading(true);
      // @ts-ignore
      const url = 'http://localhost:5000/api/users/' + user.userId;
      await axios
        .get(url)
        .then((response) => {
          if (response.data) {
            setName(response.data.name);
            setEmail(response.data.email);
            setAge(response.data.personalInformation?.age);
            setPhone(response.data.personalInformation?.phone);
            setOccupation(response.data.personalInformation?.occupation);
            SetDepartment(response.data.personalInformation?.department);
            setGender(response.data.personalInformation?.gender);
            setDatabasePath(response.data.personalInformation?.photo);
          }
        })
        .catch((error) => console.log('error: ', error))
        .finally(() => setIsLoading(false));
    }
  };

  const removeImage = () => {
    setDatabasePath('');
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value);
  };

  const handleMaleClicked = () => {
    setGender('Male');
  };

  const handleFemaleClicked = () => {
    setGender('Female');
  };

  const handlePhotoChange = (file: Blob | null) => {
    setPhoto(file);
  };

  const saveChanges = async () => {
    const formData = new FormData();
    dispatch(setIsLoading(true));
    const url =
      'http://localhost:5000/api/users/updatePersonalInformation/' +
      //   @ts-ignore
      user.personalInfoId;

    formData.append('age', age);
    formData.append('phone', phone);
    formData.append('gender', gender);
    formData.append('occupation', occupation);
    formData.append('department', department);
    formData.append('photo', photo!);

    await axios
      .patch(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response?.data) {
          dispatch(
            // @ts-ignore
            setToast({ color: 'success', message: 'Successfully edited.' })
          );
          getUserData();
          console.log('Success!');
        }
      })
      .catch((error) => {
        dispatch(
          setToast({
            // @ts-ignore
            color: 'danger',
            message: error?.response?.data?.message || '',
          })
        );
        console.log('error: ', error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <div>
      <div className={styles.title}>
        <h3>My Profile</h3>
      </div>
      <div className={styles.form}>
        <Form.Group controlId="photo">
          <Form.Label>Photo</Form.Label>
          {databasePath && (
            <div className={styles.imgContainer}>
              <img
                src={`http://localhost:5000/` + databasePath}
                alt=""
                className={styles.img}
              />
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
          {!databasePath && <ImageUpload onInput={handlePhotoChange} />}
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            value={email}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter age"
            value={age}
            onChange={handleAgeChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Check
            type="checkbox"
            checked={gender === 'Male' ? true : false}
            label="Male"
            inline
            value={gender}
            onChange={handleMaleClicked}
          ></Form.Check>
          <Form.Check
            type="checkbox"
            checked={gender === 'Female' ? true : false}
            label="Female"
            inline
            value={gender}
            onChange={handleFemaleClicked}
          ></Form.Check>
        </Form.Group>
        <Form.Group controlId="occupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
            value={occupation}
            onChange={handleOccupationChange}
          />
        </Form.Group>
        {isDoctor && (
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={handleOccupationChange}
            />
          </Form.Group>
        )}
        <div className={styles.saveBtn}>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
