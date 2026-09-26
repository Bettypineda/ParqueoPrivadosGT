import { useEffect, useState } from 'react';

type Tema = 'light' | 'dark';

const leerTemaInicial = (): Tema => {
  try {
    const guardado = localStorage.getItem('parqueosgt_theme');
    if (guardado === 'light' || guardado === 'dark') return guardado;
  } catch {
    // localStorage puede fallar en algunos contextos; seguimos con el default.
  }
  const prefiereOscuro = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefiereOscuro ? 'dark' : 'light';
};

/** Maneja el tema claro/oscuro de toda la app: lo guarda en localStorage y
 * agrega/quita la clase "dark" en <html> para que Tailwind aplique los
 * estilos dark: en todos los componentes. */
export const useTheme = () => {
  const [tema, setTema] = useState<Tema>(leerTemaInicial);

  useEffect(() => {
    const raiz = document.documentElement;
    if (tema === 'dark') {
      raiz.classList.add('dark');
    } else {
      raiz.classList.remove('dark');
    }
    try {
      localStorage.setItem('parqueosgt_theme', tema);
    } catch {
      // si el navegador bloquea localStorage, simplemente no se persiste
    }
  }, [tema]);

  const alternarTema = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'));

  return { tema, alternarTema };
};
