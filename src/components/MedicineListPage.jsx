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
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Drawer,
  TextField,
} from "@mui/material";
import MedicineDetailsPage from "./MedicineDetailsPage";
import { mainListItems } from "./listItems";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const defaultTheme = createTheme();
const drawerWidth = 280;

export default function MedicineListPage() {
  const [medicineData, setMedicineData] = useState({});
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [filteredMedicineData, setFilteredMedicineData] = useState({}); // Estado para os dados filtrados
  const history = useHistory();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("medicineData");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    setMedicineData(parsedData);
    setFilteredMedicineData(parsedData); // Inicialmente, os dados filtrados são os mesmos que os dados brutos
  }, []);

  const handleMedicineClick = (medicineId) => {
    setSelectedMedicine(medicineData[medicineId]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  const handleSearch = () => {
    const filteredData = Object.keys(medicineData).reduce(
      (filtered, medicineId) => {
        const medicine = medicineData[medicineId];
        if (
          medicine.medicineName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          medicine.labName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          filtered[medicineId] = medicine;
        }
        return filtered;
      },
      {}
    );
    setFilteredMedicineData(filteredData);
  };

  const handleFilter = () => {
    const filteredData = Object.keys(medicineData).reduce(
      (filtered, medicineId) => {
        const medicine = medicineData[medicineId];
        if (
          medicine.medicineName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          medicine.labName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          filtered[medicineId] = medicine;
        }
        return filtered;
      },
      {}
    );
    setFilteredMedicineData(filteredData);
  };

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
                  Health App
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
                  <Typography component="h1" variant="h4" align="center">
                    Lista de Medicamentos
                  </Typography>
                  {/* Barra de Busca */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <TextField
                      label="Buscar medicamento"
                      variant="outlined"
                      size="medium"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 300 }} // Aumentar a largura da barra de pesquisa
                    />
                    {/* Botão de Pesquisa */}
                    <Button variant="outlined" onClick={handleSearch}>
                      Pesquisar
                    </Button>
                  </Box>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                    gap="16px"
                    mt={3}
                    width="100%" // Adição
                  >
                    {Object.keys(filteredMedicineData).map((medicineId) => (
                      <Card key={medicineId} sx={{ width: "100%" }}>
                        <CardContent>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <ListItemIcon sx={{ alignSelf: "flex-end" }}>
                              <LocalHospitalIcon />
                            </ListItemIcon>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{ maxWidth: 200, fontWeight: "bold" }}
                              >
                                {medicineData[medicineId].medicineName}
                              </Typography>
                              <Typography>
                                Lab: {medicineData[medicineId].labName}
                              </Typography>
                              <Typography>
                                Dosagem: {medicineData[medicineId].dosage}
                              </Typography>
                              <Button
                                onClick={() => handleMedicineClick(medicineId)}
                              >
                                Detalhes
                              </Button>
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Paper>
              </Container>
            </Box>
            {/* Adicione o componente MedicineDetailsPage aqui */}
            <MedicineDetailsPage
              selectedMedicine={selectedMedicine}
              open={openModal}
              onClose={handleCloseModal}
            />
          </Box>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
}
