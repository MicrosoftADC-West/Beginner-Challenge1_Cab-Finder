/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RidesType } from "./types";

const initialStateValue: RidesType = {
  rides: [],
  ridesLoading: true
};

export const ridesSlice = createSlice({
  name: "rides",
  initialState: { value: initialStateValue },
  reducers: {
    setRides: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },

    resetRides: state => {
      state.value = initialStateValue;
    }
  }
});

export const { setRides, resetRides } = ridesSlice.actions;

export default ridesSlice.reducer;
