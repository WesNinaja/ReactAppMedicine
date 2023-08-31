import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CssBaseline,
  Paper,
  Container,
  Toolbar,
  Divider,
  List,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Drawer,
  TextField,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mainListItems } from "../listItems";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPharmacy from "@mui/icons-material/LocalPharmacy";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "leaflet/dist/leaflet.css";

const defaultTheme = createTheme();
const drawerWidth = 280;

export default function MapPharmacyPage() {
  const [pharmacyData, setPharmacyData] = useState({});
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("pharmacyData");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    setPharmacyData(parsedData);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

 
  const centerOfSaoPaulo = [-23.55052, -46.633308]; // Coordenadas do centro de São Paulo
  const defaultZoomForSaoPaulo = 7; // Nível de zoom para exibir o estado inteiro

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <div>
      <ToastContainer />
      <ThemeProvider theme={defaultTheme}>
        <React.Fragment>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Medication Management
                </Typography>
                <IconButton color="inherit">
                  <ExitToAppIcon onClick={() => handleLogout()} />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                display: "flex",
                flexDirection: "column", // Alteração para coluna
                alignItems: "center", // Centralizar horizontalmente
              }}
            >
              <Toolbar />
              <Container
                maxWidth="lg"
                sx={{
                  mt: 4,
                  mb: 4,
                  display: "flex",
                  flexDirection: "column", // Alteração para coluna
                  alignItems: "center", // Centralizar horizontalmente
                }}
              >
                <Paper
                  variant="outlined"
                  sx={{ p: { xs: 2, md: 3 }, width: "100%" }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    sx={{ marginBottom: 2 }}
                  >
                    Mapa de Farmácias
                  </Typography>
                  <MapContainer
                    center={centerOfSaoPaulo}
                    zoom={defaultZoomForSaoPaulo}
                    style={{ width: "100%", height: "600px" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {Object.keys(pharmacyData).map((pharmacyId) => {
                      const pharmacy = pharmacyData[pharmacyId];
                      const position = [
                        Number(pharmacy.geolocation.latitude),
                        Number(pharmacy.geolocation.longitude),
                      ];

                      return (
                        <Marker
                          key={pharmacyId}
                          position={position}
                          icon={L.icon({
                            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                          })}
                        >
                          <Popup>
                            <div>
                              <h2>{pharmacy.razaoSocial}</h2>
                              <p>CNPJ: {pharmacy.cnpj}</p>
                              <p>Celular: {pharmacy.cellPhone}</p>
                              {/* Adicione outras informações da farmácia aqui */}
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                    gap="16px"
                    mt={3}
                    width="100%"
                  ></Box>
                </Paper>
              </Container>
            </Box>
          </Box>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
}
