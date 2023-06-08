import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popupSlice";
import listShopReducer from "./shopSlice";
import loginReducer from "./loginSlice";
import listCartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    products: listShopReducer,
    login: loginReducer,
    listCart: listCartReducer,
  },
});

// combineReducers trong redux có tác dụng combine tất cả reducer lại thành 1 cái duy nhất và truyền vào createStore
// configureStore cũng bao gồm tính năng của combineReducers

export default store;
// đây ko phải là component, mà là nơi lưu trữ của redux
