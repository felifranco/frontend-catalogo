import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { createUser, patchUserById } from "../../store/Users";

const UserForm = () => {
  const current = useSelector((state) => state.user.current);

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    event: "new",
    id_user: -1,
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const isValidPass = () => {
    return user.password.trim() != "" && user.password != user.confirmPassword;
  };

  useEffect(() => {
    setUser(current);
  }, []);

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }} align="center">
        Usuario
      </Typography>
      <Stack spacing={2} alignItems={"center"} paddingTop={4}>
        <TextField
          id="name"
          label="Nombre completo"
          variant="outlined"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="username"
          label="Usuario de ingreso"
          variant="outlined"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="password"
          label="Contraseña"
          variant="outlined"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          error={isValidPass()}
          helperText={isValidPass() ? "Las contraseñas no coinciden." : ""}
          id="confirm_password"
          label="Confirmar contraseña"
          variant="outlined"
          value={user.confirmPassword}
          onChange={(e) => {
            setUser({
              ...user,
              confirmPassword: e.target.value,
            });
          }}
          sx={{ width: 400 }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={
            isValidPass() ||
            user.name.trim() == "" ||
            user.username.trim() == "" ||
            user.password.trim() == ""
          }
          onClick={() => {
            switch (user.event) {
              case "new":
                dispatch(
                  createUser({
                    name: user.name,
                    username: user.username,
                    password: user.password,
                  })
                );
                break;
              case "edit":
                dispatch(
                  patchUserById({
                    id_user: user.id_user,
                    name: user.name,
                    username: user.username,
                    password: user.password,
                  })
                );
                break;

              default:
                break;
            }
          }}
        >
          {user.event == "new" ? "CREAR" : "MODIFICAR"}
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;
