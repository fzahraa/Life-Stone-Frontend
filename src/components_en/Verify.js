import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useHistory } from "react-router-dom";
import { TextField, Button, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUserEn, reset } from '../features_en/user/userSlice';
import { styles } from '../Shared/Styles';
import { toast } from 'react-toastify';
import firebaseApp from "../utils/firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordIcon from '@mui/icons-material/Password';

const schema = yup.object().shape({
    code: yup.string().min(6, 'Should Be Exactly 6 Digits').required('Required*')
});

const Verify = () => {

    const [confirmationResult, setConfirmationResult] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    const formValues = JSON.parse(localStorage.getItem("formValues"));

    const { isSuccess, isLoading } = useSelector(
        (state) => state.userEn
    );

    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            code: ""
        },
        validationSchema: schema,
        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
    });

    const getCode = async () => {
        const number = '+92' + formValues.phoneNumber.toString().substring(1);

        const auth = getAuth(firebaseApp);

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
        }, auth);

        const appVerifier = window.recaptchaVerifier;

        try {
            setConfirmationResult(await signInWithPhoneNumber(auth, number, appVerifier));
            setShow(true);

        } catch (error) {

            toast.error("Some error occurred while sending the code", {
                position: "top-center"
            });
        }

        return;
    };

    const verify = () => {

        setShow(false);
        setLoading(true);

        confirmationResult.confirm(formik.values.code).then(() => {
            dispatch(registerUserEn({ name: formValues.name, email: formValues.email, password: formValues.password, phoneNumber: formValues.phoneNumber}));
        }).catch(() => {
            setLoading(false);
            setShow(true);
            toast.error("Invalid OTP Provided", {
                position: "top-center"
            });
        })
    }

    useEffect(() => {
        getCode();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (isSuccess) {
            localStorage.removeItem("formValues");
            dispatch(reset());
            history.push("/Signin");
        }
        if (!isLoading) {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, [isSuccess, isLoading]);

    useEffect(() => {
        if(formik.isValid && formik.values.code.length === 6) {
            verify();
        }
        // eslint-disable-next-line
    }, [formik.isValid]);


    if (loading) {
        return <Spinner />;
    }
    return (
        <Wrapper>

            <div id="verification__grid">

                <h1 className="verification__title" >Two Step Verification</h1>
                <h2 className="verification__subtitle">Enter 6 digit code sent at</h2>
                <p className="verification__subtitle">{formValues.phoneNumber}</p>

                <div className="form-group">
                    <h1 className="form-group__label">Verification Code</h1>
                    <TextField
                        fullWidth
                        type="text"
                        name="code"
                        value={formik.values.code}
                        onChange={(e) => {

                            let regExp = /^[0-9]*$/;

                            if (regExp.test(e.target.value)) {

                                formik.handleChange(e);
                            }
                            else {
                                console.log("Letters are not allowed");
                            }
                        }}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon sx={{ color: "blue", fontSize: "3.5rem", borderRight: "1px solid grey", paddingRight: "10px" }} />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            style: styles.textField,
                            maxLength: 6
                        }}
                    />
                    {formik.touched.code && formik.errors.code ? <p className="error">{formik.errors.code}</p> : null}
                </div>


                <Button
                    className={!formik.isValid ? "verification__btndisabled" : "verification__btnactive"}
                    variant="contained"
                    disabled={!formik.isValid}
                    onClick={() => {
                        verify();
                    }}
                >
                    Verify
                </Button>

                {show && 
                <>
                <p className="resend">
                    Didn't get the code?
                </p>
                <p className="resend">
                    <Button
                        variant="text"
                        className="resend__btn"
                        onClick={() => window.location.reload()}
                    >
                        RESEND
                    </Button>
                </p>
                <p className="resend">
                    <Button
                        variant="text"
                        className="resend__btn"
                        onClick={() =>history.push("/Signup")}
                    >
                        Change Phone Number
                    </Button>
                </p>
                </>}

                <div id="recaptcha"></div>

            </div>

        </Wrapper >
    );
};

export default Verify;

const Wrapper = styled.div`

    width: 100%;
    padding: 1rem 0rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: white;

    .verification__title {
        font-size: 2.3rem;
        font-weight: 800;
        color: white;
        text-align: center;
        background: rgb(2,0,36);
        background: linear-gradient(301deg, rgba(2,0,36,1) 0%, rgba(0,60,104,1) 35%, rgba(248,128,48,1) 100%);
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

  .verification__subtitle {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        margin-top: 1rem;
  }
  
  #verification__grid {
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
  
  #verification__grid::-webkit-scrollbar-track
  {
    border-radius: 12px;
    background-color: white;
  }

  #verification__grid::-webkit-scrollbar
  {
    width: 5px;
    border-radius: 12px;
    background-color: white;
  }

  #verification__grid::-webkit-scrollbar-thumb
  {
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #003C68;
  }


  @media only screen and (max-width: 575px) {
    #verification__grid {
        border: none;
        border-radius: 0px;
        padding: 1rem 1.5rem;
        width: 100%;
    }
  }

  .form-group {
    width: 100%;
    position: relative;
    margin: 2rem 0rem;
  }

  .form-group__label {
    font-size: 1.5rem;
    font-weight: 400;
    color: "#2a2a2a";
    margin-bottom: 0.5rem;
  }

  .verification__btnactive {
    font-size: 1.5rem;
    width: 15rem;
    font-weight: 500;
    color: white;
    background-color: #003C68;
    border-radius: 20px;
    margin-top: 1rem;
  }

  .verification__btndisabled {
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

  .resend {
    font-size: 1.3rem;
    text-align: center;
    font-weight: 600;
    margin-top: 2rem;
  }

  .resend__btn{
    color: blue;
    cursor: pointer;
    border-bottom: 1px solid blue;
    font-size: 1.3rem;
    font-weight: 600;
  }
 
`;