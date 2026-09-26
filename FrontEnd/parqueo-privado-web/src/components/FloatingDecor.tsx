import type { CSSProperties } from 'react';
import { PandaLogo, IconLeaf } from './icons';

interface ElementoFlotante {
  tipo: 'panda' | 'hoja';
  top: string;
  left: string;
  size: number; // px
  duracion: number; // segundos
  retraso: number; // segundos
  rotacion: number; // grados, posicion base
}

const ELEMENTOS: ElementoFlotante[] = [
  { tipo: 'panda', top: '8%', left: '6%', size: 42, duracion: 9, retraso: 0, rotacion: -8 },
  { tipo: 'hoja', top: '16%', left: '88%', size: 30, duracion: 11, retraso: 1.2, rotacion: 12 },
  { tipo: 'hoja', top: '38%', left: '10%', size: 24, duracion: 13, retraso: 2.5, rotacion: -20 },
  { tipo: 'panda', top: '58%', left: '93%', size: 34, duracion: 10, retraso: 0.6, rotacion: 10 },
  { tipo: 'hoja', top: '72%', left: '4%', size: 28, duracion: 12, retraso: 3, rotacion: 5 },
  { tipo: 'panda', top: '85%', left: '80%', size: 38, duracion: 14, retraso: 1.8, rotacion: -14 },
  { tipo: 'hoja', top: '28%', left: '48%', size: 22, duracion: 15, retraso: 2, rotacion: 18 },
];

/** Capa decorativa de fondo: pandas y hojitas flotando muy transparentes,
 * detras del contenido, para darle un toque personal a la interfaz sin
 * estorbar la lectura ni el uso del sistema. */
export const FloatingDecor = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {ELEMENTOS.map((el, i) => {
      const Icono = el.tipo === 'panda' ? PandaLogo : IconLeaf;
      const estilo = {
        position: 'absolute',
        top: el.top,
        left: el.left,
        width: el.size,
        height: el.size,
        animationName: 'flotar',
        animationDuration: `${el.duracion}s`,
        animationDelay: `${el.retraso}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        '--rot': `${el.rotacion}deg`,
      } as CSSProperties;

      return (
        <div key={i} style={estilo} className="text-blue-400 dark:text-blue-300 opacity-[0.09] dark:opacity-[0.07]">
          <Icono className="w-full h-full" />
        </div>
      );
    })}
  </div>
);
