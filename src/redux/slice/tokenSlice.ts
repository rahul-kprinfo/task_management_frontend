// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { value: {} };

// export const TokenSlice = createSlice({
//   name: "Token",
//   initialState: initialState,
//   reducers: {
//     setToken: (state, action) => {
//       state.value = action.payload;
//     },
//     deleteToken: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });

// export const { setToken, deleteToken } = TokenSlice.actions;
// export default TokenSlice.reducer;
// tokenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
