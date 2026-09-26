import { useState } from 'react';
import { Layout } from '../components/Layout';
import { EmpleadoForm } from '../components/EmpleadoForm';
import { IconPlus } from '../components/icons';
import { useIdioma } from '../context/IdiomaContext';

/** Pantalla independiente para agregar un empleado nuevo, accesible desde
 * "Empleados > Agregar" en el menu lateral. A diferencia del boton rapido
 * "Nuevo empleado" dentro de Consultar (que abre un modal encima de la
 * tabla), esta pantalla es su propio flujo: no depende de ni redirige a
 * Consultar. Al guardar, se muestra un mensaje de exito y el formulario se
 * reinicia (via el cambio de "key") para poder agregar otro empleado. */
export const AgregarEmpleadoPage = () => {
  const { t } = useIdioma();
  const [mensaje, setMensaje] = useState('');
  const [formKey, setFormKey] = useState(0);

  const handleGuardado = (msg: string) => {
    setMensaje(msg);
    setFormKey((k) => k + 1);
  };

  return (
    <Layout titulo={t('agregarPage.titulo')}>
      <p className="text-sm text-slate-500 dark:text-slate-400 -mt-4 mb-6">
        {t('agregarPage.subtitulo')}
      </p>

      {mensaje && (
        <div className="mb-5 p-3 rounded-xl border text-sm font-medium bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
          {mensaje}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 max-w-2xl">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-5">
          <IconPlus className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
          {t('agregarPage.datosEmpleado')}
        </h2>

        <EmpleadoForm key={formKey} empleado={null} onGuardado={handleGuardado} />
      </div>
    </Layout>
  );
};
