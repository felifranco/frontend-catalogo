import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "products";

const initialState = {
  isLoading: false,
  isError: false,
  reloadList: false,
  isAddingProduct: false,
  current: {
    id_product: -1,
    handle: "",
    title: "",
    description: "",
    sku: -1,
    grams: -1,
    stock: -1,
    price: -1,
    compare_price: -1,
    barcode: -1,
  },
  list: [],
};

export const createProduct = createAsyncThunk(
  "createProduct",
  async ({
    handle,
    title,
    description,
    sku,
    grams,
    stock,
    price,
    compare_price,
    barcode,
  }) => {
    const res = await fetch(`${configurations.BACKEND_CATALOGO}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode,
      }),
    });

    return res?.json();
  },
);

export const getProducts = createAsyncThunk("getProducts", async () => {
  const res = await fetch(`${configurations.BACKEND_CATALOGO}/${endpoint}`);
  return res?.json();
});

export const getProductById = createAsyncThunk(
  "getProductById",
  async (id_product) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_product}`,
    );
    return res?.json();
  },
);

export const patchProductById = createAsyncThunk(
  "patchProductById",
  async ({
    id_product,
    handle,
    title,
    description,
    sku,
    grams,
    stock,
    price,
    compare_price,
    barcode,
  }) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_product}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handle,
          title,
          description,
          sku,
          grams,
          stock,
          price,
          compare_price,
          barcode,
        }),
      },
    );

    return res?.json();
  },
);

export const deleteProductById = createAsyncThunk(
  "deleteProductById",
  async (id_product) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_product}`,
      {
        method: "DELETE",
      },
    );

    return res?.json();
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state) => {
      state.isAddingProduct = true;
    },
    cancelAddProduct: (state) => {
      state.isAddingProduct = false;
    },
  },
  extraReducers: (builder) => {
    //ADD PRODUCT
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingProduct = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //ALL PRODUCTS
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
      state.reloadList = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PRODUCTS BY ID
    builder.addCase(getProductById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PATCH PRODUCT BY ID
    builder.addCase(patchProductById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(patchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
    });
    builder.addCase(patchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //DELETE PRODUCT BY ID
    builder.addCase(deleteProductById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
    });
    builder.addCase(deleteProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { addProduct, cancelAddProduct } = productSlice.actions;

export default productSlice.reducer;
