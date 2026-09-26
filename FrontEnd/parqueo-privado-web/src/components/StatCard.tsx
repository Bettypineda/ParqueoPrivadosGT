import type { ReactElement } from 'react';

export interface StatCardProps {
  icono: (p: { className?: string }) => ReactElement;
  etiqueta: string;
  valor: number | string;
  color: 'blue' | 'green' | 'amber' | 'pink';
}

/** Tarjeta de estadistica reutilizable (estilo "Consulta de sucursales" del
 * ingeniero): icono + etiqueta + valor grande. Se usa tanto en el Dashboard
 * como arriba del listado de Empleados. */
export const StatCard = ({ icono: Icono, etiqueta, valor, color }: StatCardProps) => {
  const estilos = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    green: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    pink: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
  }[color];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${estilos}`}>
        <Icono className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 truncate">{etiqueta}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{valor}</p>
      </div>
    </div>
  );
};
