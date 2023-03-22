import { configureStore } from "@reduxjs/toolkit";
import userSliceEn from "../features_en/user/userSlice";
//import profileSliceEn from "../features_en/profile/profileSlice";
//import publicSliceEn from "../features_en/public/publicSlice";
// import blogPostSliceEn from "../features_en/blogPost/blogPostSlice";
// import ideaBookSliceEn from "../features_en/ideaBook/ideaBookSlice";
// import subscriptionSlice from "../features_en/subscription/subscriptionSlice";
// import adminSlice from "../features_en/users/adminSlice";
// import communitySlice from "../features_en/community/communitySlice";
// import postSlice from "../features_en/communityPost/postSlice";

const store = configureStore({
  reducer: {
    userEn: userSliceEn,
    //profileEn: profileSliceEn,
    // publicEn: publicSliceEn,
    // blogPostEn: blogPostSliceEn,
    // ideaBookEn: ideaBookSliceEn,
    // subscription: subscriptionSlice,
    // admin: adminSlice,
    // community: communitySlice,
    // feed: postSlice,
  },
  devTools: true,
});

export default store;
