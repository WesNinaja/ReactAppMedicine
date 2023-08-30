import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [startDate, setStartDate] = useState();
  const [document_user_id, setDocumentUserId] = useState();
  const [user_id, setUserId] = useState("");
  const [address, setAddress] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [cep, setCep] = useState("");
  const [houseNumber, setHouseNumber] = useState(0)
  const [complement, setComplement] = useState("")
  const [geolocation, setGeolocation] = useState({
    latitude: "",
    longitude: ""
  })

  return (
    <AppContext.Provider
      value={{
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
        address,
        setAddress,
        cep,
        setCep,
        complement,
        setComplement,
        houseNumber,
        setHouseNumber,
        geolocation,
        setGeolocation
        // ... other state and setter pairs
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
