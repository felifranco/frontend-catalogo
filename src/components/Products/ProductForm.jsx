import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { createProduct, patchProductById } from "../../store/Products";

const ProductForm = () => {
  const current = useSelector((state) => state.product.current);

  const dispatch = useDispatch();

  const [product, setProduct] = useState({
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
  });

  useEffect(() => {
    setProduct(current);
  }, []);

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }} align="center">
        Producto
      </Typography>
      <Stack spacing={2} alignItems={"center"} paddingTop={4}>
        <TextField
          id="handle"
          label="Handle"
          variant="outlined"
          value={product.handle}
          onChange={(e) => {
            setProduct({ ...product, handle: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={product.title}
          onChange={(e) => {
            setProduct({ ...product, title: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={product.description}
          onChange={(e) => {
            setProduct({ ...product, description: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="sku"
          label="SKU"
          variant="outlined"
          value={product.sku}
          onChange={(e) => {
            setProduct({ ...product, sku: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="grams"
          label="Grams"
          variant="outlined"
          value={product.grams}
          onChange={(e) => {
            setProduct({ ...product, grams: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="stock"
          label="Stock"
          variant="outlined"
          value={product.stock}
          onChange={(e) => {
            setProduct({ ...product, stock: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          value={product.price}
          onChange={(e) => {
            setProduct({ ...product, price: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="compare_price"
          label="Compare price"
          variant="outlined"
          value={product.compare_price}
          onChange={(e) => {
            setProduct({ ...product, compare_price: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="barcode"
          label="Barcode"
          variant="outlined"
          value={product.barcode}
          onChange={(e) => {
            setProduct({ ...product, barcode: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            switch (product.event) {
              case "new":
                dispatch(
                  createProduct({
                    handle: product.handle,
                    title: product.title,
                    description: product.description,
                    sku: product.sku,
                    grams: product.grams,
                    stock: product.stock,
                    price: product.price,
                    compare_price: product.compare_price,
                    barcode: product.barcode,
                  })
                );
                break;
              case "edit":
                dispatch(
                  patchProductById({
                    id_product: product.id_product,
                    handle: product.handle,
                    title: product.title,
                    description: product.description,
                    sku: product.sku,
                    grams: product.grams,
                    stock: product.stock,
                    price: product.price,
                    compare_price: product.compare_price,
                    barcode: product.barcode,
                  })
                );
                break;

              default:
                break;
            }
          }}
        >
          {product.event == "new" ? "CREAR" : "MODIFICAR"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductForm;
