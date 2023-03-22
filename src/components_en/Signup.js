import React, { useState } from 'react';
import Spinner from './Spinner';
import styled from 'styled-components';
import { styles } from '../Shared/Styles';
import { TextField, Button, InputAdornment, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PhoneIcon from '@mui/icons-material/Phone';
import { useHistory } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Required*'),
  email: yup.string().email('Invalid Email Format').required('Required*'),
  phoneNumber: yup
    .string()
    .min(10, 'Should Be Exactly 10 Digits')
    .required('Required*'),
  password: yup
    .string()
    .min(8, 'Too Short - Should Be 8 Chars Minimum')
    .required('Required*'),
  cpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  const refLink = new URLSearchParams(window.location.search).get('reflink');
  const formValues = JSON.parse(localStorage.getItem('formValues'));

  const [emailExist, setEmailExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  let initialValues;

  if (formValues) {
    initialValues = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      cpassword: formValues.cpassword,
      phoneNumber: formValues.phoneNumber,
    };
  } else {
    initialValues = {
      name: '',
      email: '',
      password: '',
      cpassword: '',
      phoneNumber: '',
    };
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const onSignUpSubmit = () => {
    localStorage.setItem(
      'formValues',
      JSON.stringify({ ...formik.values })
    );

    history.push('/Verify');
  };



  if (loading) {
    return <Spinner />;
  }
  return (
    <Wrapper>
        <div id='signup__grid'>
          <h1 className='grid__title'>Sign Up</h1>
          <div className='form-group'>
         
            <h1 className='form-group__label'>Full Name</h1>
          
            <TextField
              fullWidth
              autoComplete='off'
              type='text'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{
                style: styles.textField,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonIcon
                      sx={{
                        color: 'blue',
                        fontSize: '3.5rem',
                        borderRight: '1px solid grey',
                        paddingRight: '10px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className='error'>{formik.errors.name}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <h1 className='form-group__label'>Email Address</h1>
            <TextField
              fullWidth
              autoComplete='off'
              type='text'
              name='email'
              placeholder='e.g., example@gmail.com'
              value={formik.values.email}
              onChange={(e) => {
                if (emailExist) {
                  setEmailExist(false);
                }
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              inputProps={{
                style: styles.textField,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon
                      sx={{
                        color: 'blue',
                        fontSize: '3.5rem',
                        borderRight: '1px solid grey',
                        paddingRight: '10px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className='error'>{formik.errors.email}</p>
            ) : null}
            {emailExist && (
              <p className='error emailexists'>Email already exists</p>
            )}
          </div>

          <div className='form-group'>
            <h1 className='form-group__label'>Password</h1>
            <TextField
              fullWidth
              autoComplete='off'
              type='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{
                style: styles.textField,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <KeyIcon
                      sx={{
                        color: 'blue',
                        fontSize: '3.5rem',
                        borderRight: '1px solid grey',
                        paddingRight: '10px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className='error'>{formik.errors.password}</p>
            ) : null}
          </div>

          <div className='form-group'>
            <h1 className='form-group__label'>Confirm Password</h1>
            <TextField
              fullWidth
              autoComplete='off'
              type='password'
              name='cpassword'
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{
                style: styles.textField,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ConfirmationNumberIcon
                      sx={{
                        color: 'blue',
                        fontSize: '3.5rem',
                        borderRight: '1px solid grey',
                        paddingRight: '10px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <p className='error'>{formik.errors.cpassword}</p>
            ) : null}
          </div>

          <div className='form-group'>
            <h1 className='form-group__label'>Phone Number</h1>
            <TextField
              fullWidth
              autoComplete='off'
              type='tel'
              name='phoneNumber'
              placeholder='e.g., 03356785900'
              value={formik.values.phoneNumber}
              onChange={(e) => {
                let regExp = /^[0-9]*$/;

                if (regExp.test(e.target.value)) {
                  formik.handleChange(e);
                } else {
                  console.log('Only numbers are allowed');
                }
              }}
              onBlur={formik.handleBlur}
              inputProps={{
                style: styles.textField,
                maxLength: 11,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PhoneIcon
                      sx={{
                        color: 'blue',
                        fontSize: '3.5rem',
                        borderRight: '1px solid grey',
                        paddingRight: '10px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <p className='error'>{formik.errors.phoneNumber}</p>
            ) : null}
          </div>

          <Button
            className={
              !formik.isValid ? 'signup__btndisabled' : 'signup__btnactive'
            }
            variant='contained'
            disabled={!formik.isValid}
            onClick={() => {
              setLoading(true);
              axios
                .post(
                  'http://localhost:8000/api/user/checkemail',
                  { email: formik.values.email }
                )
                .then((response) => {
                  if (response.data.status === 'FAILED') {
                    setLoading(false);
                    setEmailExist(true);
                  } else if (response.data.status === 'SUCCESS') {
                    setLoading(false);
                    onSignUpSubmit();
                  }
                });
            }}
          >
            Register
          </Button>

          <h1 className='signintxt'>
            Already have an account?{' '}
            <b
              onClick={() => history.push('/Signin')}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              <u>Please Sign In</u>
            </b>
          </h1>
        </div>
      
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 8rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;

  ${'' /* #usertype__grid {
    height: calc(100vh - 9.5rem);
    border: 1px solid lightgrey;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 2rem;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
  } */}
  #usertype__grid {
    height: calc(100vh - 15.5rem);
    border: 1px solid lightgrey;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid #bababa;
    background-color: white;
  }
  #usertype__grid::-webkit-scrollbar-track {
    border-radius: 12px;
    background-color: white;
  }

  #usertype__grid::-webkit-scrollbar {
    width: 5px;
    border-radius: 12px;
    background-color: white;
  }

  #usertype__grid::-webkit-scrollbar-thumb {
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #003c68;
  }

  .grid__title {
    font-size: 2.3rem;
    font-weight: 800;
    color: white;
    text-align: center;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      301deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(0, 60, 104, 1) 35%,
      rgba(248, 128, 48, 1) 100%
    );
    padding: 1px 25px;
    border-radius: 3rem;
    @media only screen and (max-width: 1100px) {
      font-size: 2.2rem;
    }
    @media only screen and (max-width: 800px) {
      font-size: 2.1rem;
    }
    @media only screen and (max-width: 600px) {
      font-size: 2rem;
    }
  }

  ${'' /* .box__usertype {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid lightgrey;
    padding-bottom: 1rem;
  } */}
  .box__usertype {
    width: 100%;
    display: flex;
    padding-top: 0;
    padding-left: 5rem;
    padding-right: 5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #e4e4e4;
  }
  .box__usertype:last-child {
    border-right: none;
    padding-bottom: none;
  }

  .usertype__name {
    font-size: 2.2rem;
    @media only screen and (max-width: 800px) {
      font-size: 2rem;
    }
    @media only screen and (max-width: 600px) {
      font-size: 1.8rem;
    }
  }

  .usertype__caption {
    color: #48484a;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0rem;
    @media only screen and (max-width: 600px) {
      font-size: 1.6rem;
    }
  }

  .usertype__image {
    width: 60vh;
    height: 35rem;
    border-radius: 10%;
    cursor: pointer;
    border: 3px solid blue;
  }

  #signup__grid {
    height: calc(100vh - 9.5rem);
    border: 1px solid lightgrey;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 2rem;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 50rem;
  }

  #signup__grid::-webkit-scrollbar-track {
    border-radius: 12px;
    background-color: white;
  }

  #signup__grid::-webkit-scrollbar {
    width: 5px;
    border-radius: 12px;
    background-color: white;
  }

  #signup__grid::-webkit-scrollbar-thumb {
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #003c68;
  }

  @media only screen and (max-width: 575px) {
    #signup__grid,
    #usertype__grid {
      border: none;
      border-radius: 0px;
      padding: 1rem 1.5rem;
      width: 100%;
    }
  }

  .form-group {
    width: 100%;
    position: relative;
    margin-bottom: 2rem;
  }

  .top-form-group {
    margin-top: 2rem;
  }

  .form-group__label {
    font-size: 1.5rem;
    font-weight: 400;
    color: '#2a2a2a';
    margin-bottom: 0.5rem;
  }

  .signup__btnactive {
    font-size: 1.5rem;
    width: 15rem;
    font-weight: 500;
    color: white;
    background-color: #003c68;
    border-radius: 20px;
    margin-top: 1rem;
  }

  .signup__btndisabled {
    font-size: 1.5rem;
    width: 15rem;
    font-weight: 900;
    color: grey;
    background-color: whitesmoke;
    border-radius: 20px;
    margin-top: 1rem;
  }

  .error {
    color: red;
    margin-top: 0.5rem;
  }

  .error .emailexists {
    color: blue;
    margin-top: 0.5rem;
  }

  #box__image {
    border: 1px solid lightgray;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 14px;
  }

  .box__imageuploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;
    position: relative;
  }

  .image {
    height: 15rem;
    width: 15rem;
    border: 1px solid lightgray;
    @media only screen and (max-width: 500px) {
      height: 13rem;
      width: 13rem;
    }
  }

  .image__uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.67);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-transform: none;
  }

  .image__uploader:focus .box__image {
    border: 1px solid blue;
  }

  .waiting {
    position: absolute;
    top: 2;
    left: 45%;
    @media only screen and (max-width: 500px) {
      left: 44%;
    }
    @media only screen and (max-width: 450px) {
      left: 43%;
    }
    @media only screen and (max-width: 400px) {
      left: 42%;
    }
  }

  .signintxt {
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: #003c68;
    margin-top: 2rem;
  }
`;
