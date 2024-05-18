import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "users";

const initialState = {
  isLoading: false,
  isError: false,
  reloadList: false,
  created: false,
  isAddingUser: false,
  current: {
    event: "new",
    id_user: -1,
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  list: [],
};

export const createUser = createAsyncThunk(
  "createUser",
  async ({ name, username, password }) => {
    const res = await fetch(`${configurations.BACKEND_CATALOGO}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
      }),
    });

    return res?.json();
  }
);

export const getUsers = createAsyncThunk("getUsers", async () => {
  const res = await fetch(`${configurations.BACKEND_CATALOGO}/${endpoint}`);
  return res?.json();
});

export const getUserById = createAsyncThunk("getUserById", async (id_user) => {
  const res = await fetch(
    `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_user}`
  );
  return res?.json();
});

export const patchUserById = createAsyncThunk(
  "patchUserById",
  async ({ id_user, name, username, password }) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_user}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          password: password,
        }),
      }
    );

    return res?.json();
  }
);

export const deleteUserById = createAsyncThunk(
  "deleteUserById",
  async (id_user) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_user}`,
      {
        method: "DELETE",
      }
    );

    return res?.json();
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state) => {
      state.isAddingUser = true;
    },
    editUser: (state, action) => {
      state.isAddingUser = true;
      state.current = {
        event: "edit",
        id_user: action.payload.id_user,
        name: action.payload.name,
        username: action.payload.username,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
      };
    },
    cancelAddUser: (state) => {
      state.isAddingUser = false;
      state.current = {
        event: "new",
        id_user: -1,
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      };
    },
  },
  extraReducers: (builder) => {
    //ADD USER
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
      state.created = false;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingUser = false;
      state.created = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.created = false;
      state.isError = true;
    });

    //ALL USERS
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.valid) {
        state.list = action.payload.data;
      }
      state.reloadList = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //USERS BY ID
    builder.addCase(getUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PATCH USER BY ID
    builder.addCase(patchUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(patchUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingUser = false;
      state.current = {
        event: "new",
        id_user: -1,
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      };
    });
    builder.addCase(patchUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //DELETE USER BY ID
    builder.addCase(deleteUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { addUser, editUser, cancelAddUser } = userSlice.actions;

export default userSlice.reducer;
