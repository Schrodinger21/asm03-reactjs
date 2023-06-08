import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  product: {},
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.show = true;
      state.product = action.payload;
    },
    hidePopup: (state) => {
      state.show = false;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
