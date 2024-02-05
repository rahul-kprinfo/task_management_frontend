// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { value: "" };

// export const userSlices = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     logins: (state, action) => {
//       state.value = action.payload;
//     },
//     logouts: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });

// export const { logins, logouts } = userSlices.actions;
// export default userSlices.reducer;


// userSlice.js
// userSlice.js
// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    email: "",
  },
  isAuthenticated: Boolean(localStorage.getItem("token")),
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = { username: "", email: "" };
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
