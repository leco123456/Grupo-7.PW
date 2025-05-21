import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ConfirmarOrden from './Pages/Confirmarorden';
import SignIn from './Pages/SignIn';
import ListaValor from './Pages/ListaValor';
import ListaVenta from './Pages/ListaVenta';
import Resena from './Pages/Resena';
import Detalle from './Pages/Detalle';
import ResetPass from './Pages/ResetPass';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
