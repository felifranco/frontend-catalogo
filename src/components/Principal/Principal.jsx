import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/inventario.png";
import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  Avatar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import PublishIcon from "@mui/icons-material/Publish";
import { menu } from "../../utils/constants";
import UserList from "../Users/UserList";
import ProductList from "../Products/ProductList";
import ImportExcel from "../Import/ImportExcel";
import { setUser, logOut } from "../../store/Auth";
import { useNavigate } from "react-router-dom";

const emptyUser = {
  active: false,
  id_user: "",
  username: "",
  name: "",
};

const Principal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const active = useSelector((state) => state.auth.user.active);
  const name = useSelector((state) => state.auth.user.name);
  const username = useSelector((state) => state.auth.user.username);

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    title: "PRODUCTOS",
    itemKey: menu.PRODUCTS_LIST,
  });

  const Options = [
    {
      itemKey: menu.PRODUCTS_LIST,
      icon: <ListAltIcon />,
      title: "PRODUCTOS",
      name: "Productos",
    },
    {
      itemKey: menu.USERS_LIST,
      icon: <GroupIcon />,
      title: "USUARIOS",
      name: "Usuarios",
    },
    {
      itemKey: menu.IMPORT,
      icon: <PublishIcon />,
      title: "IMPORTAR",
      name: "Importar",
    },
  ];

  const handleClickLogOut = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
  };

  useEffect(() => {
    if (user) {
      if (user.active) {
        dispatch(setUser(user));
      } else {
        navigate("/login");
      }
    } else {
      dispatch(setUser(emptyUser));
      navigate("/login");
    }
  }, [user]);

  const DrawerMenu = () => {
    return (
      <Box>
        <List>
          {Options.map((option) => {
            return (
              <ListItem key={option.itemKey}>
                <ListItemButton
                  selected={selectedOption.itemKey == option.itemKey}
                  onClick={() => {
                    setOpen(!open);
                    setSelectedOption({
                      title: option.title,
                      itemKey: option.itemKey,
                    });
                  }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">{option.name}</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  };

  return (
    <>
      {active ? (
        <Box
          width={"100%"}
          height={"100%"}
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            backgroundColor: "#F6E9B2",
          }}
        >
          <AppBar
            position="relative"
            sx={{
              left: 380,
              marginTop: 3,
              paddingTop: 2,
              backgroundColor: "#F0DD92",
              width: "75%",
              height: 100,
            }}
          >
            <Toolbar>
              <Typography
                variant="h3"
                color={"#0A6847"}
                sx={{ flexGrow: 1, marginTop: 1 }}
              >
                {selectedOption.title}
              </Typography>
              <Button
                color="primary"
                onClick={handleClickLogOut}
                endIcon={<PowerSettingsNewIcon />}
              >
                <Typography color={"#0A6847"}>Cerrar sesión</Typography>
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              justifyContent: "center",
              marginTop: 2,
              position: "absolute",
              left: 380,
              display: "block",
              width: "75%",
            }}
          >
            {selectedOption.itemKey == menu.PRODUCTS_LIST ? (
              <ProductList />
            ) : null}
            {selectedOption.itemKey == menu.USERS_LIST ? <UserList /> : null}
            {selectedOption.itemKey == menu.IMPORT ? <ImportExcel /> : null}
          </Box>
          <Drawer variant={"permanent"} anchor="left">
            <Box
              sx={{
                width: 360,
                height: "100%",
                backgroundColor: "#F0DD92",
              }}
            >
              <Avatar
                alt="Foto de perfil"
                src={Logo}
                sx={{
                  width: 250,
                  height: 250,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 3,
                  marginBottom: 2,
                }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", marginTop: -2, marginBottom: 10 }}
              >
                Control de productos
              </Typography>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="h6">({username})</Typography>
              <DrawerMenu />
            </Box>
          </Drawer>
        </Box>
      ) : null}
    </>
  );
};

export default Principal;
