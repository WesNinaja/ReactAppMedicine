import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { AppContext } from "../../context/AppContext";

export default function MedicineDetailForm() {
  const {
    medicineName,
    setMedicineName,
    labName,
    setLabName,
    dosage,
    setDosage,
    price,
    setPrice,
    medicineType,
    setMedicineType,
    description,
    setDescription,
    document_user_id,
    user_id,
  } = useContext(AppContext);


  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="medicineName"
            label="Nome do Medicamento"
            fullWidth
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="labName"
            label="Nome do Laboratório"
            fullWidth
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dosage"
            label="Dosagem"
            fullWidth
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="description"
            label="Descrição"
            fullWidth
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            label="Preço Unitário"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="medicine-type"
            select
            label="Tipo de Medicamento"
            value={medicineType}
            onChange={(e) => setMedicineType(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="generico">Genérico</MenuItem>
            <MenuItem value="referencia">Referência</MenuItem>
            <MenuItem value="similar">Similar</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
