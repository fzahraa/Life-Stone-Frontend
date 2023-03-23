import { customFetch, customFetchProfile } from '../../utils/axios';
import { checkStatus, checkError } from '../../utils/helpers';

export const registerUserThunkEn = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/user/signupen', user);
    if (checkStatus(resp)) {
      return thunkAPI.rejectWithValue(resp.data.message);
    }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};

export const loginUserThunkEn = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/user/signinen', user);
    if (checkStatus(resp)) {
      return thunkAPI.rejectWithValue(resp.data.message);
    }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};

export const loginUserGoogleThunkEn = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/user/signinwithgoogle', user);
    if (checkStatus(resp)) {
      return thunkAPI.rejectWithValue(resp.data.message);
    }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};
export const loginUserFaceBookThunkEn = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/user/signinwithfacebook', user);
    if (checkStatus(resp)) {
      return thunkAPI.rejectWithValue(resp.data.message);
    }
    return resp.data;
  } catch (error) {
    const message = checkError(error);
    return thunkAPI.rejectWithValue(message);
  }
};







