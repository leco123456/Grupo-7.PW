import { Routes, Route } from 'react-router-dom';

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import PaginaPrincipal from './Pages/PaginaPrincipal';
import AdminJuegos from './Pages/AdminJuegos';
import ConfirmarOrden from './Pages/Confirmarorden';
import ListaValor from './Pages/ListaValor';
import ListaVenta from './Pages/ListaVenta';
import Resena from './Pages/Resena';
import Detalle from './Pages/Detalle';
import ResetPass from './Pages/ResetPass';
import EditarNoticia from './Pages/EditarNoticia';
import EliminarNoticia from './Pages/EliminarNoticia';
import Noticias from './Pages/Noticias';
import AgregarNoticia from './Pages/AgregarNoticia';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/paginaprincipal" element={<PaginaPrincipal />} />
      <Route path="/adminjuegos" element={<AdminJuegos />} />
      <Route path="/confirmarorden" element={<ConfirmarOrden />} />
      <Route path="/listavalor" element={<ListaValor />} />
      <Route path="/listaventa" element={<ListaVenta />} />
      <Route path="/resena" element={<Resena />} />
      <Route path="/detalle" element={<Detalle />} />
      <Route path="/resetpass" element={<ResetPass />} />
    </Routes>
  );
}

export default App;
