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
  addUser,
  editUser,
  cancelAddUser,
  getUsers,
  deleteUserById,
} from "../../store/Users";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomModal from "../Common/CustomModal";
import UserForm from "./UserForm";

const UserList = () => {
  const reloadList = useSelector((state) => state.user.reloadList);
  const isAddingUser = useSelector((state) => state.user.isAddingUser);
  const list = useSelector((state) => state.user.list);

  const dispatch = useDispatch();

  const handleClickShowEdit = (user) => {
    dispatch(editUser(user));
  };

  const handleClickDelete = (id) => {
    dispatch(deleteUserById(id));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (reloadList) {
      dispatch(getUsers());
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
            dispatch(addUser());
          }}
        >
          AGREGAR USUARIO
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}>Nombre completo</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Username</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Acción</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((user) => {
                return (
                  <TableRow key={user.id_user}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleClickShowEdit(user);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleClickDelete(user.id_user);
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
        open={isAddingUser}
        component={<UserForm />}
        handleClose={() => {
          dispatch(cancelAddUser());
        }}
      />
    </Box>
  );
};

export default UserList;
