import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInSlide from "./components/SignIn";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import PharmacyForm from "./components/add-pharmacy/PharmacyForm";
import { AppContextProvider } from "./components/AppContext";
import axios from "axios";
import MedicineForm from "./components/add-medicine/MedicineForm";
import MedicineListPage from "./components/MedicineListPage";
import MapPharmacyPage from "./components/maps/MapPharmacyPage";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="App">
      <AppContextProvider>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <SignInSlide onLoading={handleLoading} />}
            />
            <Route
              exact
              path="/register"
              render={() => <SignUp onLoading={handleLoading} />}
            />
            <Route
              exact
              path="/dashboard"
              render={() => <Dashboard onLoading={handleLoading} />}
            />
            <Route
              exact
              path="/add-pharmacy"
              render={() => <PharmacyForm onLoading={handleLoading} />}
            />
            <Route
              exact
              path="/add-medicine"
              render={() => <MedicineForm onLoading={handleLoading} />}
            />
            <Route
              exact
              path="/medicine-page"
              render={() => <MedicineListPage onLoading={handleLoading} />}
            />
            <Route
              exact
              path="/maps"
              render={() => <MapPharmacyPage onLoading={handleLoading} />}
            />
            {/* Rota para Loading */}
            {loading && <Route exact path="/loading" component={Loading} />}
            {/* Rota para NotFound */}
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
