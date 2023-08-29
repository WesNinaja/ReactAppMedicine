import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { AppContext } from "../AppContext";
import { useContext } from "react";

export default function Review() {
  const {
    razaoSocial,
    fantasyName,
    cnpj,
    email,
    phone,
    cellPhone,
    startDate,
    document_user_id,
    medicineDuration
  } = useContext(AppContext);
  console.log(startDate);
  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":");
    const date = new Date(0, 0, 0, hours, minutes);

    let period = "AM";
    if (date.getHours() >= 12) {
      period = "PM";
    }

    const hours12 = date.getHours() % 12 || 12;
    const formattedTime = `${hours12}:${minutes} ${period}`;
    return formattedTime;
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Patient's Details
      </Typography>
      <List disablePadding>
        <ListItem key={razaoSocial} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Razão Social"} />
          <Typography variant="body2">{razaoSocial}</Typography>
        </ListItem>
        <ListItem key={fantasyName} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Nome Fantasia"} />
          <Typography variant="body2">{fantasyName}</Typography>
        </ListItem>
        <ListItem key={cnpj} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"CNPJ"} />
          <Typography variant="body2">{cnpj}</Typography>
        </ListItem>
        <ListItem key={email} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Email"} />
          <Typography variant="body2">{email}</Typography>
        </ListItem>
        <ListItem key={phone} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Telefone"} />
          <Typography variant="body2">{phone}</Typography>
        </ListItem>
        <ListItem key={cellPhone} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Celular"} />
          <Typography variant="body2">{cellPhone}</Typography>
        </ListItem>
        <ListItem key={startDate} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Starting Date"} />
          <Typography variant="body2">{startDate}</Typography>
        </ListItem>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        </Typography>
      </List>
    </React.Fragment>
  );
}
