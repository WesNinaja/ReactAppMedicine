import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MedicineDetailForm from "./MedicineDetailForm"; // Novo componente para detalhes de medicamento
import MedicineReviewForm from "./MedicineReviewForm"; // Novo componente para revisão de medicamento
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { mainListItems } from "../listItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const steps = ["INFORMAÇÕES", "REVISÃO"];

function getMedicineStepContent(step) {
  switch (step) {
    case 0:
      return <MedicineDetailForm />;
    case 1:
      return <MedicineReviewForm />;
    default:
      throw new Error("Unknown step");
  }
}
const defaultTheme = createTheme();
const drawerWidth = 280;

export default function MedicineForm() {
  const [loggedInUserId, setUserLoggedIn] = React.useState();

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    setUserLoggedIn(loggedInUserId);
  }, []);

  const {
    medicineName,
    labName,
    dosage,
    price,
    medicineType,
    description,
    document_user_id,
    user_id,
  } = useContext(AppContext);

  const requestObj = {
    medicineName,
    labName,
    dosage,
    price,
    medicineType,
    description,
    user_id,
  };

  console.log(requestObj);

  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(true);

  // State to manage success message
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMedicineNext = async () => {
    // Validação dos campos obrigatórios de medicamento
    console.log(activeStep)
    if (!medicineType) {
      toast.error("Por favor, preencha todos os campos obrigatórios", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (activeStep === 1) {
        try {
          const storedData = localStorage.getItem("medicineData");
          const existingData = storedData ? JSON.parse(storedData) : {};

          // Gerar um ID aleatório para o medicamento
          const medicineId = `med-${Date.now()}`;

          const newMedicine = {
            medicineName,
            labName,
            dosage,
            description,
            price,
            medicineType,
            document_user_id: medicineId
            // Outras informações relevantes do medicamento
          };

          const newData = {
            ...existingData,
            [medicineId]: newMedicine,
          };

          localStorage.setItem("medicineData", JSON.stringify(newData));

          toast.success("Medicamento cadastrado com sucesso!", {
            // Configurações do toast
          });

          setShowSuccessMessage(true);
        } catch (error) {
          toast.error("Ocorreu um erro ao cadastrar o medicamento.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      if (activeStep === 0) setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("email");
    setTimeout(() => {
      history.push("/");
    }, 2000);
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
              }}
            >
              <Toolbar />
              <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <Paper
                  variant="outlined"
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  <Typography component="h1" variant="h4" align="center">
                    Novo Medicamento
                  </Typography>
                  <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography variant="h5" gutterBottom>
                        {showSuccessMessage
                          ? "Medicamento cadastrado com sucesso!"
                          : "Obrigado por cadastrar as informações!"}{" "}
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {getMedicineStepContent(activeStep)}
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {activeStep !== 0 && (
                          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Voltar
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          onClick={handleMedicineNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          {activeStep === steps.length - 1
                            ? "Cadastrar"
                            : "Próximo"}
                        </Button>
                      </Box>
                    </React.Fragment>
                  )}
                </Paper>
              </Container>
            </Box>
          </Box>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
}
