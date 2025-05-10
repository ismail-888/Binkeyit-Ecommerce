import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import productReducer from "./productSlice";
import cartReducer from "./cartProduct";
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
    addresses : addressReducer,
    orders : orderReducer
  },
});
