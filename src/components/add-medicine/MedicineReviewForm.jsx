import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function MedicineReviewForm() {
  const {
    medicineName,
    labName,
    dosage,
    description,
    price,
    medicineType,
  } = useContext(AppContext);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalhes do Medicamento
      </Typography>
      <List disablePadding>
        <ListItem key={medicineName} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Nome do Medicamento"} />
          <Typography variant="body2">{medicineName}</Typography>
        </ListItem>
        <ListItem key={labName} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Nome do Laboratório"} />
          <Typography variant="body2">{labName}</Typography>
        </ListItem>
        <ListItem key={dosage} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Dosagem"} />
          <Typography variant="body2">{dosage}</Typography>
        </ListItem>
        <ListItem key={description} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Descrição"} />
          <Typography variant="body2">{description}</Typography>
        </ListItem>
        <ListItem key={price} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Preço Unitário"} />
          <Typography variant="body2">{price}</Typography>
        </ListItem>
        <ListItem key={medicineType} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Tipo de Medicamento"} />
          <Typography variant="body2">{medicineType}</Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
