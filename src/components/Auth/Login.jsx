import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Link,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../../assets/inventario.png";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../store/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const active = useSelector((state) => state.auth.user.active);
  const user = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    dispatch(checkLogin({ username, password }));
  };

  useEffect(() => {
    if (active) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  }, [active]);

  return (
    <Box>
      <Paper
        elevation={10}
        sx={{ width: 500, height: 520, backgroundColor: "#F0DD92" }}
      >
        <Stack spacing={2} alignItems={"center"} paddingTop={4}>
          <Box
            component={"img"}
            src={Logo}
            alt="Logo"
            sx={{ height: 175, width: 175 }}
          />
          <TextField
            id="username"
            variant="outlined"
            label="Usuario"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            sx={{ width: 400 }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            sx={{ width: 400 }}
            type="password"
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#0A6847" }}
            sx={{ width: 200 }}
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
          <Typography variant="h8">¿No tienes cuenta?</Typography>
          <Link href="/register">Regístrate</Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
