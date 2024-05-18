import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import userReducer from "./Users";
import productReducer from "./Products";
import alertReducer from "./Alert";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    alert: alertReducer,
  },
});
