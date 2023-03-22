import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { TextField, Button, InputAdornment } from '@mui/material';
import { styles } from '../Shared/Styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import Spinner from './Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserEn } from '../features_en/user/userSlice';
import { getUserFromLocalStorage } from '../utils/localStorage';

const schema = yup.object().shape({
  email: yup.string().email('Invalid Email Format').required('Required*'),
  password: yup.string().required('Required*'),
});

const Signin = () => {
  const user = getUserFromLocalStorage();

  const { isLoading, isSuccess } = useSelector((state) => state.userEn);

  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const onSignInSubmit = () => {
    dispatch(
      loginUserEn({
        email: formik.values.email,
        password: formik.values.password,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      if (localStorage.getItem('review')) {
        const now = new Date().getTime();
        const review = JSON.parse(localStorage.getItem('review'));

        if (now - review.reviewTime > 1 * 60 * 60 * 1000) {
          localStorage.removeItem('review');
          if (user) {
            history.push('/');
          } 
        } else {
          localStorage.removeItem('review');
          history.entries = [];
          history.index = -1;
          history.push(review.reviewRoute);
        }
      } else {
        if (user) {
          history.push('/');
        } 
      }
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div id='signin__grid'>
        <h1 className='signin__title'>Sign In</h1>

        <div className='form-group top-form-group'>
          <h1 className='form-group__label'>Email Address</h1>
          <TextField
            fullWidth
            autoComplete='off'
            type='text'
            name='email'
            placeholder='e.g., example@gmail.com'
            value={formik.values.email}
            onChange={formik.handleChange}
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

        <Button
          className={
            !formik.isValid ? 'signin__btndisabled' : 'signin__btnactive'
          }
          variant='contained'
          disabled={!formik.isValid}
          onClick={onSignInSubmit}
        >
          Log In
        </Button>

        <h1 className='signuptxt'>
          Don't have an account?{' '}
          <b
            onClick={() => history.push('/Signup')}
            style={{ cursor: 'pointer', color: 'red' }}
          >
            <u>Please Sign Up</u>
          </b>
        </h1>
      </div>
    </Wrapper>
  );
};

export default Signin;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 0rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;

  .signin__title {
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

  #signin__grid {
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

  #signin__grid::-webkit-scrollbar-track {
    border-radius: 12px;
    background-color: white;
  }

  #signin__grid::-webkit-scrollbar {
    width: 5px;
    border-radius: 12px;
    background-color: white;
  }

  #signin__grid::-webkit-scrollbar-thumb {
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #003c68;
  }

  @media only screen and (max-width: 575px) {
    #signin__grid {
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

  .signin__btnactive {
    font-size: 1.5rem;
    width: 15rem;
    font-weight: 500;
    color: white;
    background-color: #003c68;
    border-radius: 20px;
    margin-top: 1rem;
  }

  .signin__btndisabled {
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

  .signuptxt {
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: #003c68;
    margin-top: 2rem;
  }
`;
