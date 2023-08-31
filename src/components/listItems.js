import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/List";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <NavLink
      to="/dashboard"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard Farmácias" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/medicine-page"
      style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Lista de medicamentos" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/maps"
      style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="Mapa" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/add-pharmacy"
      style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Nova Farmácia" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/add-medicine"
      style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Novo Medicamento" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);
