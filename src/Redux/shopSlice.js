import { createSlice } from "@reduxjs/toolkit";

const initialListShopState = {
  content: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: initialListShopState,
  reducers: {
    list_products(state, action) {
      state.content = action.payload;
    },
  },
});

export const { list_products } = productSlice.actions;
export default productSlice.reducer;
