import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import postSlice from "./slices/auth/postSlice";
import commentSlice from "./slices/comments/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
  },
});
