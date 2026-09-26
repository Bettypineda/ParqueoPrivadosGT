import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

/** Envuelve una pagina que requiere sesion iniciada. Si no hay token
 * guardado en sessionStorage (se borra al cerrar el navegador), manda de
 * vuelta al login en vez de mostrarla. */
export const RutaProtegida = ({ children }: { children: ReactElement }) => {
  const token = sessionStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
