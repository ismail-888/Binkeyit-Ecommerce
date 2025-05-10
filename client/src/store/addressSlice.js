import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  addressList: [],
};

const addressslice = createSlice({
  name: "address",
  initialState: initialValue,
  reducers: {
    handleAddAddress: (state, action) => {
      state.addressList = [...action.payload];
    },
  },
});

export const { handleAddAddress } = addressslice.actions;
export default addressslice.reducer;
