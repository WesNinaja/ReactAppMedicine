import React from "react";
import {
  Typography,
  Modal,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function MedicineDetailsPage({
  selectedMedicine,
  open,
  onClose,
}) {
  if (!selectedMedicine) {
    return null; // Retorna nada se selectedMedicine for nulo
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 600 }}>
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              padding: "8px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              sx={{ width: "100%" }}
            >
              Detalhes do Medicamento
            </Typography>
            <Button onClick={onClose} color="inherit">
              <CloseIcon />
            </Button>
          </Box>
          <CardContent>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  width: "100%",
                  margin: "8px 0",
                  textAlign: "center",
                }}
              >
                {selectedMedicine.medicineName}
              </Typography>
              <Typography gutterBottom>
                <strong>Lab:</strong> {selectedMedicine.labName}
              </Typography>
              <Typography gutterBottom>
                <strong>Dosagem:</strong> {selectedMedicine.dosage}
              </Typography>
              <Typography gutterBottom>
                <strong>Descrição:</strong> {selectedMedicine.description}
              </Typography>
              <Typography gutterBottom>
                <strong>Preço:</strong> {selectedMedicine.price}
              </Typography>
              <Typography gutterBottom>
                <strong>Tipo:</strong> {selectedMedicine.medicineType}
              </Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "8px 16px",
            }}
          >
            <Button onClick={onClose} variant="contained" color="primary">
              Fechar
            </Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}
