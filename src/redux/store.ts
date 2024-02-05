// import { configureStore } from "@reduxjs/toolkit";
// import user_details from "./slice/user";
// import token_slice from "./slice/tokenSlice";

// export const store = configureStore({
//   reducer: {
//     userDetails: user_details,
//     token: token_slice,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
// import tokenSlice from "./slice/tokenSlice";
import authSlice from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth:authSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

