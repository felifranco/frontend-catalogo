import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { checkLogin } from "../Auth";
import { createUser, patchUserById, deleteUserById } from "../Users";
import {
  createProduct,
  bulkInsert,
  patchProductById,
  deleteProductById,
} from "../Products";

const initialState = {
  message: "",
  showMessage: false,
  isError: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.isError = action.payload.error;
      state.showMessage = true;
    },
    cleanMessage: (state) => {
      state.message = "";
      state.showMessage = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    //LOGIN
    builder.addMatcher(isAnyOf(checkLogin.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(checkLogin.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //ADD USER
    builder.addMatcher(isAnyOf(createUser.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(createUser.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //PATCH USER BY ID
    builder.addMatcher(isAnyOf(patchUserById.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(patchUserById.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //DELETE USER BY ID
    builder.addMatcher(isAnyOf(deleteUserById.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(deleteUserById.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //ADD PRODUCT
    builder.addMatcher(isAnyOf(createProduct.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(createProduct.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //BULK INSERT PRODUCTS
    builder.addMatcher(isAnyOf(bulkInsert.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(bulkInsert.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //PATCH PRODUCT BY ID
    builder.addMatcher(isAnyOf(patchProductById.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(patchProductById.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //DELETE PRODUCT BY ID
    builder.addMatcher(
      isAnyOf(deleteProductById.fulfilled),
      (state, action) => {
        state.showMessage = action.payload.message ? true : false;
        state.message = action.payload.message;
        state.isError = !action.payload.valid;
      }
    );

    builder.addMatcher(isAnyOf(deleteProductById.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });
  },
});

export const { setMessage, cleanMessage } = alertSlice.actions;

export default alertSlice.reducer;
