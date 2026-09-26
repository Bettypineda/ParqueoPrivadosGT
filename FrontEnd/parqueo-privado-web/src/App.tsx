import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { EmpleadosPage } from './pages/EmpleadosPage';
import { BuscarEmpleadoPage } from './pages/BuscarEmpleadoPage';
import { AgregarEmpleadoPage } from './pages/AgregarEmpleadoPage';
import { DashboardPage } from './pages/DashboardPage';
import { RutaProtegida } from './components/RutaProtegida';
import { IdiomaProvider } from './context/IdiomaContext';

function App() {
  const hayToken = !!sessionStorage.getItem('accessToken');

  return (
    <IdiomaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RutaProtegida>
                <DashboardPage />
              </RutaProtegida>
            }
          />
          <Route
            path="/empleados"
            element={
              <RutaProtegida>
                <EmpleadosPage />
              </RutaProtegida>
            }
          />
          <Route
            path="/empleados/agregar"
            element={
              <RutaProtegida>
                <AgregarEmpleadoPage />
              </RutaProtegida>
            }
          />
          <Route
            path="/empleados/buscar"
            element={
              <RutaProtegida>
                <BuscarEmpleadoPage />
              </RutaProtegida>
            }
          />
          {/* Ruta por defecto: si ya inicio sesion entra al Dashboard, si no al login. */}
          <Route path="*" element={<Navigate to={hayToken ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </BrowserRouter>
    </IdiomaProvider>
  );
}

export default App;
