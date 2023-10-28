import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelInfo: localStorage.getItem("hotelInfo")
    ? JSON.parse(localStorage.getItem("hotelInfo"))
    : null,
};

const hotelAuthSlice = createSlice({
  name: "hotelauth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.hotelInfo = action.payload;
      localStorage.setItem("hotelInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.hotelInfo = null;
      localStorage.removeItem("hotelInfo");
    },
  },
});

export const { setCredentials, logout } = hotelAuthSlice.actions;

export default hotelAuthSlice.reducer;
