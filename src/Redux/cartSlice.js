import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  cartItems: cartItems,
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const tempItem = state.cartItems.find(
        (item) => item._id.$oid === action.payload._id.$oid
      );

      if (tempItem) {
        const tempCart = state.cartItems.map((item) => {
          if (item._id.$oid === action.payload._id.$oid) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalprice = newQty * item.price;

            return {
              ...item,
              quantity: newQty,
              totalPrice: newTotalprice,
            };
          } else {
            return item;
          }
        });
        state.cartItems = tempCart;
        storeInLocalStorage(state.cartItems);
      } else {
        state.cartItems.push(action.payload);
        storeInLocalStorage(state.cartItems);
      }
      console.log(state.totalQuantity);
    },

    updateItem: (state, action) => {
      // const newItem = action.payload;

      state.cartItems.forEach((element, index) => {
        if (element.name === action.payload.name) {
          // const arrayTemp = [...state.value]
          state.cartItems[index] = action.payload;
        }
      });

      storeInLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      console.log("removeID :", action.payload._id.$oid);
      const tempCart = state.cartItems.filter(
        (item) => item._id.$oid !== action.payload._id.$oid
      );

      state.cartItems = tempCart;
      storeInLocalStorage(state.cartItems);
    },

    getCartTotal: (state) => {
      state.totalAmount = state.cartItems.reducer((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalQuantity = state.cartItems.length;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  getCartTotal,
  updateItem,
  toggleCartQty,
} = cartSlice.actions;
