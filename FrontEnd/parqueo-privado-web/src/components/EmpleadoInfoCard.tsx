import type { ReactElement } from 'react';
import type { Empleado } from './EmpleadoFormModal';
import { useIdioma } from '../context/IdiomaContext';
import {
  IconBuilding,
  IconIdCard,
  IconPhone,
  IconMail,
  IconCalendar,
  IconCash,
  IconVenus,
  IconMars,
  IconShieldCheck,
  IconCashRegister,
  IconUserTie,
  IconBriefcase,
} from './icons';

/** Asigna un icono y color según el tipo de puesto, para que se identifique
 * de un vistazo (guardia, cajero, supervisor, etc.). Se comparte entre la
 * tabla de Consultar, el detalle y la pantalla de Buscar. */
export const infoPuesto = (
  puesto: string,
): { Icon: (p: { className?: string }) => ReactElement; clases: string } => {
  const p = (puesto || '').toLowerCase();
  if (p.includes('guardia') || p.includes('seguridad')) {
    return { Icon: IconShieldCheck, clases: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' };
  }
  if (p.includes('cajer') || p.includes('cobro')) {
    return { Icon: IconCashRegister, clases: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
  }
  if (p.includes('supervisor') || p.includes('gerente') || p.includes('administra')) {
    return { Icon: IconUserTie, clases: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' };
  }
  return { Icon: IconBriefcase, clases: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' };
};

/** Icono de género para el avatar junto al nombre del empleado. */
export const iconoGenero = (genero: string) => (genero === 'F' ? IconVenus : IconMars);

/** Filas de detalle (icono + etiqueta + valor) de un empleado, reutilizadas
 * en el modal "Ver detalle" de Consultar y en la pantalla de Buscar. */
export const EmpleadoInfoCard = ({ empleado }: { empleado: Empleado }) => {
  const { t } = useIdioma();

  const filas: { Icon: (p: { className?: string }) => ReactElement; etiqueta: string; valor: string }[] = [
    { Icon: IconBuilding, etiqueta: t('infoCard.sede'), valor: String(empleado.codigosede) },
    { Icon: IconIdCard, etiqueta: t('infoCard.dpi'), valor: empleado.dpi },
    { Icon: infoPuesto(empleado.puesto).Icon, etiqueta: t('infoCard.puesto'), valor: empleado.puesto },
    { Icon: IconPhone, etiqueta: t('infoCard.telefono'), valor: empleado.telefono || '—' },
    { Icon: IconMail, etiqueta: t('infoCard.correo'), valor: empleado.correoelectronico || '—' },
    {
      Icon: IconCalendar,
      etiqueta: t('infoCard.fechaContratacion'),
      valor: empleado.fechacontratacion ? empleado.fechacontratacion.substring(0, 10) : '—',
    },
    { Icon: IconCash, etiqueta: t('infoCard.salario'), valor: `Q${empleado.salario}` },
    {
      Icon: iconoGenero(empleado.genero),
      etiqueta: t('infoCard.genero'),
      valor: empleado.genero === 'F' ? t('form.femenino') : t('form.masculino'),
    },
  ];

  return (
    <div className="space-y-1">
      {filas.map(({ Icon, etiqueta, valor }) => (
        <div key={etiqueta} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
          <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            <Icon className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">{etiqueta}</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{valor}</p>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3 py-2">
        <span
          className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg ${
            empleado.estado === 1
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${empleado.estado === 1 ? 'bg-emerald-500' : 'bg-slate-400'}`} />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">{t('infoCard.estado')}</p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {empleado.estado === 1 ? t('estado.activo') : t('estado.inactivo')}
          </p>
        </div>
      </div>
    </div>
  );
};
