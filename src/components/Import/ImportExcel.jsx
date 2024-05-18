import { useState, useEffect } from "react";
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
} from "@mui/material";
import { bulkInsert, bulkInsertedOff } from "../../store/Products";
import * as XLSX from "xlsx";
import SaveIcon from "@mui/icons-material/Save";

const ImportExcel = () => {
  const bulkInserted = useSelector((state) => state.product.bulkInserted);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        setList(sheetData);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleSaveData = () => {
    const data = [];
    list.forEach((product) => {
      data.push({
        handle: product.Handle,
        title: product.Title,
        description: product.Description,
        sku: product.SKU,
        grams: product.Grams,
        stock: product.Stock,
        price: product.Price,
        compare_price: product["Compare Price"],
        barcode: product.Barcode,
      });
    });
    dispatch(bulkInsert({ products: data }));
  };

  useEffect(() => {
    if (bulkInserted) {
      setList([]);
      dispatch(bulkInsertedOff());
    }
  }, [bulkInserted]);

  return (
    <Box>
      <style>
        {`
            input[type="file"] {
                display: none;
            }
            
            .custom-file-upload {
                border: 1px solid #ccc;
                display: inline-block;
                padding: 6px 12px;
                cursor: pointer;
                background-color: #0A6847;
                border-radius: 5px;
                margin-right: 10px;
                padding-top: 4px;
                padding-bottom: 8px;
            }
            `}
      </style>
      <label for="file-upload" className="custom-file-upload">
        IMPORTAR ARCHIVO EXCEL
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="secondary"
        endIcon={<SaveIcon />}
        onClick={() => {
          handleSaveData();
        }}
      >
        Guardar importación
      </Button>
      <Stack spacing={3} sx={{ marginTop: 2, alignItems: "center" }}>
        <Typography variant="h4" fontWeight={"bold"} color={"black"}>
          Vista previa de la carga
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}>#</Typography>
                </TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{product.Handle}</TableCell>
                    <TableCell align="center">{product.Title}</TableCell>
                    <TableCell align="center">{product.Description}</TableCell>
                    <TableCell align="center">{product.SKU}</TableCell>
                    <TableCell align="center">{product.Grams}</TableCell>
                    <TableCell align="center">{product.Stock}</TableCell>
                    <TableCell align="center">{product.Price}</TableCell>
                    <TableCell align="center">
                      {product["Compare Price"]}
                    </TableCell>
                    <TableCell align="center">{product.Barcode}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default ImportExcel;
