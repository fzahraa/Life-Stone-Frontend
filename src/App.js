import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './Shared/Styles';
import ErrorPage from './utils/ErrorPage';
import LinearProgress from '@mui/material/LinearProgress';

// Public Pages.
import {
  LoginPageEn,
  SignupPageEn,
  AboutPageEn,
  ContactPageEn,
  VerifyPageEn,
} from './pages_en';


// Flow 1 (Guest Flow)
import {
  HomePageEn,
} from './pages_en/GuestFlow';

// Private Routes.
import {
  PrivateWithUserEn,
  PrivateWithOutUserEn,
} from './pages_en/ProtectedRoutes';

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<LinearProgress />}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path='/ContactUs'>
                <ContactPageEn></ContactPageEn>
              </Route>

              <Route exact path='/About'>
                <AboutPageEn></AboutPageEn>
              </Route>

              <PrivateWithUserEn
                exact
                path='/Signin'
                component={LoginPageEn}
              ></PrivateWithUserEn>


              <PrivateWithUserEn
                exact
                path='/Signup'
                component={SignupPageEn}
              ></PrivateWithUserEn>

              <PrivateWithOutUserEn
                exact
                path='/Verify'
                component={VerifyPageEn}
              ></PrivateWithOutUserEn>

        
              <Route exact path='/'>
                <HomePageEn></HomePageEn>
              </Route>


              <Route exact path='*'>
                <ErrorPage></ErrorPage>
              </Route>
            </Switch>
          </ThemeProvider>
        </Suspense>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
