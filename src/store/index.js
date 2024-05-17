import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Users";
import productReducer from "./Products";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
