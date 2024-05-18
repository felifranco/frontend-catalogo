import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppBar, Toolbar, Box, Stack, Typography, Alert } from "@mui/material";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Principal from "./components/Principal/Principal";
import { cleanMessage } from "./store/Alert";

const App = () => {
  const message = useSelector((state) => state.alert.message);
  const showMessage = useSelector((state) => state.alert.showMessage);
  const isError = useSelector((state) => state.alert.isError);

  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Principal />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  const Message = () => {
    return showMessage ? (
      <Alert
        severity={isError ? "error" : "success"}
        variant="filled"
        sx={{ position: "absolute", right: 50, bottom: 50 }}
      >
        {message}
      </Alert>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (showMessage) {
        dispatch(cleanMessage());
      }
    }, 3000);
  }, [showMessage]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Stack alignItems={"center"}>
        <AppBar
          position="relative"
          sx={{
            width: "90%",
            marginTop: 3,
            height: 100,
            backgroundColor: "#E7B10A",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h2"
              color="#4C4B16"
              sx={{ fontWeight: "bold", marginTop: 2 }}
            >
              Control de productos
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            width: "100%",
          }}
        >
          <RouterProvider router={router} />
        </Box>
        <Message />
      </Stack>
    </Box>
  );
};

export default App;
