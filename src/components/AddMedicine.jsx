import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DatePicker from "./DatePicker";
import { useState } from "react";
import TimePicker from "@mui/material/TimePicker";

export default function MedicineForm() {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [dailyRoutine, setDailyRoutine] = useState(4);
  const [patName, setPatName] = useState("PatientName");
  const [patAge, setPatAge] = useState("PatientAge");
  const [MedName, setMedName] = useState("MedicineName");
  const [Days, setDays] = useState("NumDays");


  return (
    <React.Fragment>
      <div>
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
              onChange={(e) => {
                setRazaoSocial(e.target.value)
                console.log(razaoSocial);
              }}
              value={razaoSocial}
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
              onChange={(e) => {
                setFantasyName(e.target.value)
                console.log(fantasyName);
              }}
              value={fantasyName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              fullWidth
              autoComplete=""
              variant="standard"
              onChange={(e) => {
                setCnpj(e.target.value);
                console.log(cnpj);
              }}
              value={cnpj}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="PatientName"
              name="Patient Age"
              label="Patient's Age"
              fullWidth
              autoComplete=""
              variant="standard"
              onChange={(e) => {
                setPatAge(e.target.value);
                console.log(patAge);
              }}
              value={patAge}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker label="Date of Birth" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="medicine"
              name="Medicine Name"
              label="Medicine Name"
              fullWidth
              autoComplete=""
              variant="standard"
              onChange={(e) => {
                setMedName(e.target.value);
                console.log(MedName);
              }}
              value={MedName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker label="Starting Date" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="numberofDays"
              name="numberDays"
              label="Number of Days"
              fullWidth
              autoComplete=""
              variant="standard"
              onChange={(e) => {
                setDays(e.target.value);
                console.log(Days);
              }}
              value={Days}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="dailyRoutine"
              name="dailyRoutine"
              label="Daily Routine"
              fullWidth
              autoComplete=""
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="dailyDosage"
              name="dailyDosage"
              label="Daily Dosage"
              fullWidth
              autoComplete=""
              variant="standard"
              // onChange={(e)=> setDailyRoutine(e.target.value)}
              // value={dailyRoutine}
            />
          </Grid>

          <Grid item xs={12}>
            <TimePicker
              label="Controlled picker"
              value={`${hours}:${minutes}:${seconds}`}
              //  onChange={newValue => setValue(newValue)}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
