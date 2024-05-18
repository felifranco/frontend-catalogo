import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/inventario.png";
import {
  Box,
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../store/Users";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const created = useSelector((state) => state.user.created);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const isValidPass = () => {
    return password.trim() != "" && password != passConfirm;
  };

  useEffect(() => {
    if (created) {
      navigate("/login");
    }
  }, [created]);

  return (
    <Box>
      <Paper
        elevation={10}
        sx={{ width: 600, height: 600, backgroundColor: "#F0DD92" }}
      >
        <Stack spacing={1} alignItems={"center"} paddingTop={4}>
          <Box
            component={"img"}
            src={Logo}
            alt="Logo"
            sx={{ height: 175, width: 175 }}
          />
          <TextField
            id="name"
            label="Nombre completo"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            sx={{ width: 400 }}
          />
          <TextField
            id="username"
            label="Usuario de ingreso"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            sx={{ width: 400 }}
          />
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            sx={{ width: 400 }}
          />
          <TextField
            error={isValidPass()}
            helperText={isValidPass() ? "Las contraseñas no coinciden." : ""}
            id="confirm_password"
            label="Confirmar contraseña"
            variant="outlined"
            value={passConfirm}
            onChange={(e) => {
              setPassConfirm(e.target.value);
            }}
            sx={{ width: 400 }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor:
                isValidPass() ||
                name.trim() == "" ||
                username.trim() == "" ||
                password.trim() == ""
                  ? ""
                  : "#0A6847",
            }}
            disabled={
              isValidPass() ||
              name.trim() == "" ||
              username.trim() == "" ||
              password.trim() == ""
            }
            onClick={() => {
              dispatch(
                createUser({
                  name: name,
                  username: username,
                  password: password,
                })
              );
            }}
          >
            Registrarse
          </Button>
          <Typography variant="h8">¿Ya tienes una cuenta?</Typography>
          <Link href="/login">Ingresa aquí</Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Register;
