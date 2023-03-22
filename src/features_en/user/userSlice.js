import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunkEn,
  registerUserThunkEn,
} from './userThunk';

const initialState = {
  isLoading: false,
  isSuccess: false,
  allUsers: [],
  user: getUserFromLocalStorage(),
};

export const registerUserEn = createAsyncThunk(
  'user/registerUserEn',
  registerUserThunkEn
);
export const loginUserEn = createAsyncThunk(
  'user/loginUserEn',
  loginUserThunkEn
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.allUsers = [];
    },
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserEn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserEn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      toast.success(payload.message);
    });
    builder.addCase(registerUserEn.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });

    builder.addCase(loginUserEn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserEn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;

      const user = {
        userId: payload.user._id,
        name_en: payload.user.name_en,
        userType: payload.user.userType,
        token: payload.token,
        profile: payload.user.profile,
        profilePic: payload.user.photo,
        favourites: payload.user.favourites,
        notifications: payload.user.notifications,
        followedProfiles: payload.user.followedProfiles,
        profileId: payload.user.profileId,
      };

      addUserToLocalStorage(user);
      state.user = user;
    });
    builder.addCase(loginUserEn.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });

  }
});

export const { logoutUser, reset } = userSlice.actions;
export default userSlice.reducer;
