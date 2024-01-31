import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const TokenSlice = createSlice({
  name: "Token",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    deleteToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setToken, deleteToken } = TokenSlice.actions;
export default TokenSlice.reducer;
