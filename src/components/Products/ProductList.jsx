import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  addProduct,
  editProduct,
  cancelAddProduct,
  getProducts,
  deleteProductById,
} from "../../store/Products";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomModal from "../Common/CustomModal";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const reloadList = useSelector((state) => state.product.reloadList);
  const isAddingProduct = useSelector((state) => state.product.isAddingProduct);
  const list = useSelector((state) => state.product.list);

  const dispatch = useDispatch();

  const handleClickShowEdit = (product) => {
    dispatch(editProduct(product));
  };

  const handleClickDelete = (id) => {
    dispatch(deleteProductById(id));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (reloadList) {
      dispatch(getProducts());
    }
  }, [reloadList]);

  return (
    <Box>
      <Stack spacing={3} sx={{ marginTop: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#0A6847" }}
          endIcon={<PersonAddIcon />}
          onClick={() => {
            dispatch(addProduct());
          }}
        >
          AGREGAR PRODUCTO
        </Button>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}>Handle</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Title</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Description</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>SKU</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Grams</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Stock</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Price</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Compare price</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Barcode</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Acción</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((product) => {
                return (
                  <TableRow key={product.id_product}>
                    <TableCell>{product.handle}</TableCell>
                    <TableCell align="center">{product.title}</TableCell>
                    <TableCell align="center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></div>
                    </TableCell>
                    <TableCell align="center">{product.sku}</TableCell>
                    <TableCell align="center">{product.grams}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">
                      {product.compare_price}
                    </TableCell>
                    <TableCell align="center">{product.barcode}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleClickShowEdit(product);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleClickDelete(product.id_product);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <CustomModal
        open={isAddingProduct}
        component={<ProductForm />}
        handleClose={() => {
          dispatch(cancelAddProduct());
        }}
      />
    </Box>
  );
};

export default ProductList;
