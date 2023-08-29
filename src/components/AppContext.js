import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
   const [name, setName] = useState("");
   const [razaoSocial, setRazaoSocial] = useState("");
   const [fantasyName, setFantasyName] = useState("");
   const [email, setEmail ] = useState("");
   const [phone, setPhone] = useState("")
   const [cellPhone, setCellPhone] = useState("")
   const [cnpj, setCnpj] = useState("")
   const [age, setAge] = useState(0);
   const [dob, setDob] = useState();
   const [medicineName, setMedicineName] = useState();
   const [startDate, setStartDate] = useState();
   const [document_user_id, setDocumentUserId] = useState();
   const [dailyDosageCount, setDailyDosageCount] = useState();
   const [dailyOccurrence, setDailyOccurrence] = useState([]);
   const [user_id,setUserId]= useState("");
  // ... other states

  return (
    <AppContext.Provider
      value={{
        name,setName,razaoSocial, setRazaoSocial, fantasyName, setFantasyName, cnpj, setCnpj, email, setEmail, phone, setPhone, cellPhone, setCellPhone,  age,setAge,dob,setDob,medicineName,setMedicineName,startDate,setStartDate,document_user_id,setDocumentUserId,
        dailyDosageCount,setDailyDosageCount,dailyOccurrence,setDailyOccurrence,user_id,setUserId
        // ... other state and setter pairs
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
