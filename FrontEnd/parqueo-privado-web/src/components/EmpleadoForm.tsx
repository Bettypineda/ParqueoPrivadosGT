import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { api } from '../api/axios';
import type { Empleado } from './EmpleadoFormModal';
import { useIdioma } from '../context/IdiomaContext';
import {
  IconBuilding,
  IconVenus,
  IconMars,
  IconUserCircle,
  IconIdCard,
  IconBriefcase,
  IconPhone,
  IconMail,
  IconCalendar,
  IconCash,
} from './icons';

interface FormState {
  codigoSede: string;
  nombres: string;
  apellidos: string;
  dpi: string;
  puesto: string;
  telefono: string;
  correo: string;
  fechaContratacion: string;
  salario: string;
  genero: string;
}

const formVacio: FormState = {
  codigoSede: '',
  nombres: '',
  apellidos: '',
  dpi: '',
  puesto: '',
  telefono: '',
  correo: '',
  fechaContratacion: '',
  salario: '',
  genero: 'M',
};

const empleadoAForm = (emp: Empleado): FormState => ({
  codigoSede: String(emp.codigosede ?? ''),
  nombres: emp.nombres ?? '',
  apellidos: emp.apellidos ?? '',
  dpi: emp.dpi ?? '',
  puesto: emp.puesto ?? '',
  telefono: emp.telefono ?? '',
  correo: emp.correoelectronico ?? '',
  fechaContratacion: emp.fechacontratacion ? emp.fechacontratacion.substring(0, 10) : '',
  salario: String(emp.salario ?? ''),
  genero: emp.genero ?? 'M',
});

interface Props {
  /** null = formulario de "Nuevo empleado". Con un empleado, se abre en modo Editar. */
  empleado: Empleado | null;
  onGuardado: (mensaje: string) => void;
  /** Si se pasa, se muestra un boton "Cancelar" (uso en modal). Si se omite,
   * el formulario queda como pantalla independiente (uso en Agregar de pagina completa). */
  onCancelar?: () => void;
}

/** Campos + logica de Agregar/Editar empleado, sin el "marco" visual
 * (ni modal ni tarjeta), para poder reusarlo tanto dentro de un modal
 * (EmpleadoFormModal) como en una pagina independiente (AgregarEmpleadoPage). */
export const EmpleadoForm = ({ empleado, onGuardado, onCancelar }: Props) => {
  const { t } = useIdioma();
  const [form, setForm] = useState<FormState>(empleado ? empleadoAForm(empleado) : formVacio);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(empleado ? empleadoAForm(empleado) : formVacio);
    setError('');
  }, [empleado]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setError('');

    const payload = {
      codigoSede: Number(form.codigoSede),
      nombres: form.nombres,
      apellidos: form.apellidos,
      dpi: form.dpi,
      puesto: form.puesto,
      telefono: form.telefono,
      correo: form.correo,
      fechaContratacion: form.fechaContratacion,
      salario: Number(form.salario),
      genero: form.genero,
    };

    try {
      const { data } = empleado
        ? await api.put(`/empleados/${empleado.codigoempleado}`, payload)
        : await api.post('/empleados', payload);

      if (data?.estado) {
        onGuardado(data.mensaje || 'Operación realizada correctamente.');
      } else {
        setError(data?.mensaje || 'No se pudo guardar el empleado.');
      }
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al conectar con el servidor.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="mb-1 p-3 rounded-xl border text-sm font-medium bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.codigoSede')}</label>
          <div className="relative">
            <IconBuilding className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              name="codigoSede"
              value={form.codigoSede}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.genero')}</label>
          <div className="relative">
            {form.genero === 'F' ? (
              <IconVenus className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
            ) : (
              <IconMars className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
            )}
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            >
              <option value="M">{t('form.masculino')}</option>
              <option value="F">{t('form.femenino')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.nombres')}</label>
          <div className="relative">
            <IconUserCircle className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.apellidos')}</label>
          <div className="relative">
            <IconUserCircle className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.dpi')}</label>
        <div className="relative">
          <IconIdCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            name="dpi"
            value={form.dpi}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.puesto')}</label>
          <div className="relative">
            <IconBriefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="puesto"
              value={form.puesto}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.telefono')}</label>
          <div className="relative">
            <IconPhone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.correo')}</label>
        <div className="relative">
          <IconMail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.fechaContratacion')}</label>
          <div className="relative">
            <IconCalendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              name="fechaContratacion"
              value={form.fechaContratacion}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t('form.salario')}</label>
          <div className="relative">
            <IconCash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              step="0.01"
              name="salario"
              value={form.salario}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            {t('form.cancelar')}
          </button>
        )}
        <button
          type="submit"
          disabled={guardando}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer disabled:opacity-50"
        >
          {guardando ? t('form.guardando') : empleado ? t('form.guardarCambios') : t('form.agregar')}
        </button>
      </div>
    </form>
  );
};
