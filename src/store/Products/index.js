import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "products";

const initialState = {
  isLoading: false,
  isError: false,
  reloadList: false,
  isAddingProduct: false,
  bulkInserted: false,
  current: {
    event: "new",
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
  }
);

export const bulkInsert = createAsyncThunk(
  "bulkInsert",
  async ({ products }) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/bulk-insert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
        }),
      }
    );

    return res?.json();
  }
);

export const getProducts = createAsyncThunk("getProducts", async () => {
  const res = await fetch(`${configurations.BACKEND_CATALOGO}/${endpoint}`);
  return res?.json();
});

export const getProductById = createAsyncThunk(
  "getProductById",
  async (id_product) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_product}`
    );
    return res?.json();
  }
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
      }
    );

    return res?.json();
  }
);

export const deleteProductById = createAsyncThunk(
  "deleteProductById",
  async (id_product) => {
    const res = await fetch(
      `${configurations.BACKEND_CATALOGO}/${endpoint}/${id_product}`,
      {
        method: "DELETE",
      }
    );

    return res?.json();
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state) => {
      state.isAddingProduct = true;
    },
    editProduct: (state, action) => {
      state.isAddingProduct = true;
      state.current = {
        event: "edit",
        id_product: action.payload.id_product,
        handle: action.payload.handle,
        title: action.payload.title,
        description: action.payload.description,
        sku: action.payload.sku,
        grams: action.payload.grams,
        stock: action.payload.stock,
        price: action.payload.price,
        compare_price: action.payload.compare_price,
        barcode: action.payload.barcode,
      };
    },
    cancelAddProduct: (state) => {
      state.isAddingProduct = false;
      state.current = {
        event: "new",
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
      };
    },
    bulkInsertedOff: (state) => {
      state.bulkInserted = false;
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

    //BULK INSERT PRODUCTS
    builder.addCase(bulkInsert.pending, (state, action) => {
      state.isLoading = true;
      state.bulkInserted = false;
    });
    builder.addCase(bulkInsert.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.bulkInserted = true;
    });
    builder.addCase(bulkInsert.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //ALL PRODUCTS
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.valid) {
        state.list = action.payload.data;
      }
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
      state.isAddingProduct = false;
      state.current = {
        event: "new",
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
      };
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

export const { addProduct, editProduct, cancelAddProduct, bulkInsertedOff } =
  productSlice.actions;

export default productSlice.reducer;
