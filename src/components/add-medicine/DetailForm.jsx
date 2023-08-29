import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Review from "./ReviewForm";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useEffect } from "react";

export default function DetailForm() {
  const {
    razaoSocial,
    setRazaoSocial,
    fantasyName,
    setFantasyName,
    cnpj,
    setCnpj,
    email,
    setEmail,
    phone,
    setPhone,
    cellPhone,
    setCellPhone,
    startDate,
    setStartDate,
    document_user_id,
    setDocumentUserId,
    user_id,
    setUserId,
  } = useContext(AppContext);
  const loggedInUserId = sessionStorage.getItem("loggedInUserId");
  console.log(loggedInUserId);
  setUserId(loggedInUserId);
  console.log(startDate);
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setStartDate(formattedToday);
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="razaoSocial"
            name="razaoSocial"
            label="Razão Social"
            fullWidth
            autoComplete=""
            variant="standard"
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fantasyName"
            name="fantasyName"
            label="Nome Fantasia"
            fullWidth
            autoComplete=""
            variant="standard"
            value={fantasyName}
            onChange={(e) => setFantasyName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cnpj"
            name="Cnpj"
            label="Cnpj"
            fullWidth
            autoComplete=""
            variant="standard"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete=""
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete=""
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cellPhone"
            name="cellPhone"
            label="Cell Phone"
            fullWidth
            autoComplete=""
            variant="standard"
            value={cellPhone}
            onChange={(e) => setCellPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="startingDate"
            name="startingDate"
            label="Starting Date"
            type="date"
            defaultValue={formattedToday}
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
