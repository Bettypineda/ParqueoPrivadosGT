import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { TRADUCCIONES, type Idioma } from '../i18n/translations';

interface IdiomaContextValue {
  idioma: Idioma;
  alternarIdioma: () => void;
  t: (clave: string) => string;
}

const IdiomaContext = createContext<IdiomaContextValue | null>(null);

const leerIdiomaInicial = (): Idioma => {
  try {
    const guardado = localStorage.getItem('parqueosgt_idioma');
    if (guardado === 'es' || guardado === 'en') return guardado;
  } catch {
    // si el navegador bloquea localStorage, seguimos con el default
  }
  return 'es';
};

/** Provee el idioma actual (es/en) a toda la app y la funcion t() para
 * traducir textos de la interfaz, sin depender de ninguna libreria externa.
 * Se guarda en localStorage (independiente de la sesion de login) para que
 * la preferencia de idioma se recuerde aunque se cierre el navegador. */
export const IdiomaProvider = ({ children }: { children: ReactNode }) => {
  const [idioma, setIdioma] = useState<Idioma>(leerIdiomaInicial);

  useEffect(() => {
    try {
      localStorage.setItem('parqueosgt_idioma', idioma);
    } catch {
      // si falla, simplemente no se persiste la preferencia
    }
  }, [idioma]);

  const alternarIdioma = () => setIdioma((actual) => (actual === 'es' ? 'en' : 'es'));

  const t = (clave: string): string => TRADUCCIONES[idioma][clave] ?? clave;

  return <IdiomaContext.Provider value={{ idioma, alternarIdioma, t }}>{children}</IdiomaContext.Provider>;
};

export const useIdioma = () => {
  const contexto = useContext(IdiomaContext);
  if (!contexto) {
    throw new Error('useIdioma debe usarse dentro de <IdiomaProvider>');
  }
  return contexto;
};
