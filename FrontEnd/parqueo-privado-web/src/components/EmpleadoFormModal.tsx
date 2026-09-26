import { EmpleadoForm } from './EmpleadoForm';
import { useIdioma } from '../context/IdiomaContext';

export interface Empleado {
  codigoempleado: number;
  codigosede: number;
  nombres: string;
  apellidos: string;
  dpi: string;
  puesto: string;
  telefono: string;
  correoelectronico: string;
  fechacontratacion: string;
  salario: string;
  genero: string;
  estado: number;
}

interface Props {
  /** null = formulario de "Nuevo empleado". Con un empleado, se abre en modo Editar. */
  empleado: Empleado | null;
  onCerrar: () => void;
  onGuardado: (mensaje: string) => void;
}

/** Modal de Agregar/Editar empleado, compartido entre la pantalla de Consultar
 * y la de Buscar, para no duplicar el formulario en dos lugares. Es solo el
 * "marco" (overlay + tarjeta + titulo): los campos y la logica de guardado
 * viven en EmpleadoForm, reusado tambien en la pagina independiente de
 * Agregar (AgregarEmpleadoPage). */
export const EmpleadoFormModal = ({ empleado, onCerrar, onGuardado }: Props) => {
  const { t } = useIdioma();

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-400">
          {empleado ? `${t('form.tituloEditar')} #${empleado.codigoempleado}` : t('form.tituloNuevo')}
        </h2>

        <EmpleadoForm empleado={empleado} onGuardado={onGuardado} onCancelar={onCerrar} />
      </div>
    </div>
  );
};
