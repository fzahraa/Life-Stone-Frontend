import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import pointer from '../../images/point.png';
import { useHistory, useLocation } from 'react-router-dom';
import {
  logoutUser,
  reset,
} from '../../features_en/user/userSlice';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { useSelector, useDispatch } from 'react-redux';


const NavbarClient = () => {
  const { user, isLoading, isSuccess } = useSelector((state) => state.userEn);

  const localUser = getUserFromLocalStorage();

  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const [activeIcon, setActiveIcon] = useState('');

  const onLogout = () => {
    dispatch(logoutUser());

    if (location.pathname === '/Profile' || location.pathname === '/HomeFeed') {
      history.push('/');
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  return (
    <Wrapper>
      <div className='content__right'>
        {localUser ? (
          <>
            <div className='container__profile'>
              <IconButton
                className={
                  activeIcon === 'profile' ? 'active__box' : 'inactive__box'
                }
                onClick={() => {
                  setActiveIcon('profile');


                  const menu = document.getElementById('box__profilemenu');
                  if (menu.style.display === 'none') {
                    document.getElementById('hider').style.display = 'block';
                    menu.style.display = 'flex';
                  } else if (menu.style.display === 'flex') {
                    document.getElementById('hider').style.display = 'none';
                    menu.style.display = 'none';
                    setActiveIcon('');
                  }
                }}
              >
                <PersonOutlineOutlinedIcon
                  className={
                    activeIcon === 'profile' ? 'active__icon' : 'inactive__icon'
                  }
                />
              </IconButton>

              <div id='box__profilemenu' style={{ display: 'none' }}>
                <img src={pointer} alt='pointer' id='profilemenu__pointer' />
                <h1
                  className='profilemenu__pf'
                  onClick={() => {
                    history.push('/Profile');
                  }}
                >
                   Profile
                </h1>
                
                <h1
                  className='profilemenu__exit'
                  onClick={() => {
                    onLogout();
                  }}
                >
                  <ExitToAppIcon className='exit__icon' /> Sign out
                </h1>
              </div>
            </div>
          </>
        ) : !localUser && location.pathname !== '/Signin' ? (
          <button id='signin__btn' onClick={() => history.push('/Signin')}>
            Sign In
          </button>
        ) : !localUser && location.pathname === '/Signin' ? (
          <button id='signup__btn' onClick={() => history.push('/Signup')}>
            Sign Up
          </button>
        ) : null}
      </div>

      <div
        id='hider'
        style={{ display: 'none' }}
        onClick={() => {
          setActiveIcon('');

          const profilemenu = document.getElementById('box__profilemenu');
          if (profilemenu) profilemenu.style.display = 'none';
          document.getElementById('hider').style.display = 'none';
        }}
      ></div>
    </Wrapper>
  );
};

export default NavbarClient;

const Wrapper = styled.div`
  width: 100%;
  height: 7.5rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 6rem;
  position: relative;
  @media only screen and (max-width: 1200px) {
    padding: 0rem 4rem;
  }

  @media only screen and (max-width: 1000px) {
    padding: 0rem 3rem;
  }
  @media only screen and (max-width: 550px) {
    padding: 0rem 1rem;
  }

  #hider {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 7.6rem;
    right: 0rem;
    z-index: 2;
  }

  .inactive__boxnavlinks {
    background-color: #f6f8f8;
  }

  .inactive__boxnavlinks:hover {
    background-color: #f6f8f8;
  }

  .active__boxnavlinks {
    background-color: #f88030;
  }

  .active__boxnavlinks:hover {
    background-color: #f88030;
  }

  #logo {
    height: 6.5rem;
    width: 6.5rem;
    cursor: pointer;
    @media only screen and (max-width: 900px) {
      height: 6rem;
      width: 6rem;
    }
    @media only screen and (max-width: 600px) {
      height: 5.5rem;
      width: 5.5rem;
    }
    @media only screen and (max-width: 450px) {
      height: 5rem;
      width: 5rem;
    }
  }

  .box__navlinks {
    margin-left: 4.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 1050px) {
      margin-left: 2rem;
    }
    @media only screen and (max-width: 950px) {
      margin-left: 1rem;
    }
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }

  .navlink {
    margin-right: 2rem;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    background-color: #f6f8f8;
    padding: 1rem 1.3rem;
    border-radius: 5rem;
    color: #4e4e4e;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 950px) {
      margin-right: 1rem;
    }
  }

  .navlink__icon {
    font-size: 2rem;
    margin-right: 5px;
  }

  .content__right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    position: relative;
    margin-right: 1rem;
    @media only screen and (max-width: 500px) {
      margin-right: 0.5rem;
    }
    @media only screen and (max-width: 400px) {
      margin-right: 0.25rem;
    }
  }

  .inactive__box {
    background-color: #f6f8f8;
  }

  .inactive__box:hover {
    background-color: #f6f8f8;
  }

  .inactive__icon {
    font-size: 2.5rem;
    color: #555555;
    @media only screen and (max-width: 500px) {
      font-size: 2.2rem;
    }
  }

  .active__box {
    background-color: #f88030;
  }

  .active__box:hover {
    background-color: #f88030;
  }

  .active__icon {
    font-size: 2.5rem;
    color: white;
    @media only screen and (max-width: 500px) {
      font-size: 2.2rem;
    }
  }

  .container__profile {
    position: relative;
    margin-left: 50px;
  }

  #signin__btn {
    font-size: 14px;
    background-color: #003c68;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    margin-left: 1rem;
    @media only screen and (max-width: 500px) {
      font-size: 12px;
      padding: 0.5rem 1rem;
    }
    @media only screen and (max-width: 400px) {
      font-size: 12px;
      padding: 0.5rem 0.8rem;
    }
  }

  #signin__btn:hover {
    background-color: #f88030;
  }

  #signup__btn {
    font-size: 14px;
    background-color: #003c68;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    margin-left: 1rem;
    @media only screen and (max-width: 500px) {
      font-size: 12px;
      padding: 0.5rem 1rem;
    }
    @media only screen and (max-width: 400px) {
      font-size: 12px;
      padding: 0.5rem 0.8rem;
    }
  }

  #signup__btn:hover {
    background-color: #f88030;
  }

  #box__profilemenu {
    position: absolute;
    top: 5.5rem;
    right: -1rem;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 13.5rem;
    padding: 3px;
    background: #ffffff;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
      0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    @media only screen and (max-width: 1000px) {
      right: 0rem;
    }
    @media only screen and (max-width: 500px) {
      top: 5.3rem;
    }
  }

  .profilemenu__pf {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #374151;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 16px;
    width: 100%;
    border-radius: 6px 0px 6px 6px;
    cursor: pointer;
    text-align: center;
  }

  .profilemenu__pf:hover {
    background-color: #f6f8f8;
  }

  .profilemenu__exit {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #374151;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 16px;
    border-top: 1px solid #efefef;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
  }


  .profile__icon {
    color: #4f4d4d;
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
  }


  #profilemenu__pointer {
    position: absolute;
    top: -1rem;
    right: 2rem;
    height: 1rem;
    width: 2rem;
    clip-path: polygon(50% 0, 0% 100%, 100% 100%);
    @media only screen and (max-width: 1000px) {
      right: 1rem;
    }
  }


`;

