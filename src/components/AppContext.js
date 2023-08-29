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
  // ... other states

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
        // ... other state and setter pairs
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
