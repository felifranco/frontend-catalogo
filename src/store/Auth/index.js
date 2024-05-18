import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "auth";

const initialState = {
  user: {
    active: false,
    id_user: "",
    username: "",
    password: "",
    name: "",
  },
};

export const checkLogin = createAsyncThunk(
  "checkLogin",
  async ({ username, password }) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    return res?.json();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {
        active: false,
        id_user: "",
        username: "",
        name: "",
      };
    },
  },
  extraReducers: (builder) => {
    //LOGIN
    builder.addCase(checkLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action && action.payload.valid) {
        state.user.id_user = action.payload.data.id_user;
        state.user.username = action.payload.data.username;
        state.user.name = action.payload.data.name;
        state.user.active = true;
      } else {
        state.isError = true;
      }
    });
    builder.addCase(checkLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
