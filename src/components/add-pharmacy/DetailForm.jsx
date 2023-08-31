import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useEffect } from "react";
import axios from "axios";

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
    cep,
    setCep,
    address,
    setAddress,
    houseNumber,
    setHouseNumber,
    complement,
    setComplement,
    geolocation,
    setGeolocation,
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
  const [cepNotFound, setCepNotFound] = useState(false);

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      // Verifica se a resposta possui a propriedade "erro"
      if (data.erro) {
        setCepNotFound(true); // Marca o status de CEP não encontrado
      } else {
        // Caso contrário, preenche o endereço
        setAddress({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
        setCepNotFound(false); // Reseta o status de CEP não encontrado
      }
    } catch (error) {
      console.error("Erro ao buscar endereço pelo CEP:", error);
      setCepNotFound(true); // Marca o status de CEP não encontrado
    }
  };

  const cepNotFoundMessage = (
    <p style={{ color: "red" }}>
      CEP não encontrado. Edite os campos de endereço manualmente.
    </p>
  );

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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cep"
            name="cep"
            label="CEP"
            fullWidth
            autoComplete=""
            variant="standard"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
              setCepNotFound(false); // Reseta o status de CEP não encontrado
              // Buscar endereço quando o CEP for digitado
              if (e.target.value.length === 8) {
                buscarEnderecoPorCep(e.target.value);
              }
            }}
          />
          {cepNotFound && cepNotFoundMessage}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="logradouro"
            name="logradouro"
            label="Logradouro/Endereço"
            fullWidth
            autoComplete=""
            variant="standard"
            value={address.logradouro}
            disabled={cepNotFound}
            onBlur={() => setCepNotFound(true)} // Desativa o onChange se o CEP não for encontrado
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bairro"
            name="bairro"
            label="Bairro"
            fullWidth
            autoComplete=""
            variant="standard"
            value={address.bairro}
            disabled={cepNotFound}
            onBlur={() => setCepNotFound(true)} // Desativa o onChange se o CEP não for encontrado
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cidade"
            name="cidade"
            label="Cidade"
            fullWidth
            autoComplete=""
            variant="standard"
            value={address.cidade}
            disabled={cepNotFound}
            onBlur={() => setCepNotFound(true)} // Desativa o onChange se o CEP não for encontrado
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="estado"
            name="estado"
            label="Estado"
            fullWidth
            autoComplete=""
            variant="standard"
            value={address.estado}
            disabled={cepNotFound}
            onBlur={() => setCepNotFound(true)} // Desativa o onChange se o CEP não for encontrado
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="houseNumber"
            name="houseNumber"
            label="Numero da Casa"
            fullWidth
            autoComplete=""
            variant="standard"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            disabled={cepNotFound || !address.logradouro} // Desativa se o CEP não for encontrado ou se o endereço não for preenchido
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="complement"
            name="complement"
            label="Complement"
            fullWidth
            autoComplete=""
            variant="standard"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="latitude"
            name="latitude"
            label="Latitude"
            fullWidth
            autoComplete=""
            variant="standard"
            value={geolocation.latitude}
            onChange={(e) =>
              setGeolocation({
                ...geolocation, // Preserva outras propriedades do geolocation
                latitude: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="longitude"
            name="longitude"
            label="Longitude"
            fullWidth
            autoComplete=""
            variant="standard"
            value={geolocation.longitude}
            onChange={(e) =>
              setGeolocation({
                ...geolocation, // Preserva outras propriedades do geolocation
                longitude: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
