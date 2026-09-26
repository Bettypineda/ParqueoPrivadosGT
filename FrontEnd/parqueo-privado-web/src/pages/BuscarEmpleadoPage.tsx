import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/axios';
import { Layout } from '../components/Layout';
import { IconSearch, IconPencil, IconTrash, IconUserCircle } from '../components/icons';
import { EmpleadoFormModal, type Empleado } from '../components/EmpleadoFormModal';
import { EmpleadoInfoCard, iconoGenero } from '../components/EmpleadoInfoCard';
import { useIdioma } from '../context/IdiomaContext';

/** Pantalla de "Buscar" del CRUD: consume GET /empleados/:id (el sp_empleado_buscar
 * del backend), y desde el resultado permite Editar y Eliminar ese mismo registro,
 * para que Editar/Eliminar del menú lateral tengan un punto de entrada real. */
export const BuscarEmpleadoPage = () => {
  const { t } = useIdioma();
  const [searchParams] = useSearchParams();
  const accion = searchParams.get('accion'); // 'editar' | 'eliminar' | null

  const [codigo, setCodigo] = useState('');
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [yaBusco, setYaBusco] = useState(false);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'ok' | 'error' } | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const mostrarMensaje = (texto: string, tipo: 'ok' | 'error') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 4000);
  };

  const buscar = async (e: FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    setBuscando(true);
    setYaBusco(true);
    setEmpleado(null);
    try {
      const { data } = await api.get(`/empleados/${codigo.trim()}`);
      if (data?.estado && data.datos) {
        setEmpleado(data.datos as Empleado);
      } else {
        mostrarMensaje(data?.mensaje || `No se encontró ningún empleado con el código ${codigo}.`, 'error');
      }
    } catch (err: any) {
      mostrarMensaje(err.response?.data?.mensaje || 'Error al conectar con el servidor.', 'error');
    } finally {
      setBuscando(false);
    }
  };

  const refrescarEncontrado = async (cod: number) => {
    try {
      const { data } = await api.get(`/empleados/${cod}`);
      if (data?.estado && data.datos) setEmpleado(data.datos as Empleado);
    } catch {
      // si falla el refresco, dejamos el dato anterior; no es crítico aquí
    }
  };

  const handleEliminar = async () => {
    if (!empleado) return;
    const confirmado = window.confirm(
      `${t('confirmarEliminar.pre')} ${empleado.nombres} ${empleado.apellidos}${t('confirmarEliminar.post')}`
    );
    if (!confirmado) return;

    try {
      const { data } = await api.delete(`/empleados/${empleado.codigoempleado}`);
      if (data?.estado) {
        mostrarMensaje(data.mensaje || 'Empleado eliminado correctamente.', 'ok');
        setEmpleado(null);
        setCodigo('');
      } else {
        mostrarMensaje(data?.mensaje || 'No se pudo eliminar el empleado.', 'error');
      }
    } catch (err: any) {
      mostrarMensaje(err.response?.data?.mensaje || 'Error al conectar con el servidor.', 'error');
    }
  };

  const titulo =
    accion === 'editar' ? t('buscarPage.tituloEditar') : accion === 'eliminar' ? t('buscarPage.tituloEliminar') : t('buscarPage.tituloDefault');

  const subtitulo =
    accion === 'editar'
      ? t('buscarPage.subtituloEditar')
      : accion === 'eliminar'
      ? t('buscarPage.subtituloEliminar')
      : t('buscarPage.subtituloDefault');

  const IconGenero = empleado ? iconoGenero(empleado.genero) : null;

  return (
    <Layout titulo={titulo}>
      <p className="text-sm text-slate-500 dark:text-slate-400 -mt-4 mb-6">{subtitulo}</p>

      {mensaje && (
        <div
          className={`mb-5 p-3 rounded-xl border text-sm font-medium ${
            mensaje.tipo === 'ok'
              ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400'
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={buscar} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 max-w-xs w-full shadow-sm">
          <IconSearch className="w-4 h-4 text-slate-400" />
          <input
            type="number"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder={t('buscarPage.placeholder')}
            className="bg-transparent text-sm outline-none w-full text-slate-800 dark:text-slate-100"
          />
        </div>
        <button
          type="submit"
          disabled={buscando}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          {buscando ? t('buscarPage.buscando') : t('buscarPage.boton')}
        </button>
      </form>

      {empleado && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`w-11 h-11 rounded-full flex items-center justify-center ${
                empleado.genero === 'F'
                  ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-500 dark:text-pink-400'
                  : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400'
              }`}
            >
              {IconGenero && <IconGenero className="w-5 h-5" />}
            </span>
            <div>
              <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-tight">
                {empleado.nombres} {empleado.apellidos}
              </h2>
              <p className="text-xs text-slate-400">{t('empleado.numero')} #{empleado.codigoempleado}</p>
            </div>
          </div>

          <EmpleadoInfoCard empleado={empleado} />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={handleEliminar}
              className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              <IconTrash className="w-4 h-4" />
              {t('accion.eliminar')}
            </button>
            <button
              onClick={() => setModalAbierto(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              <IconPencil className="w-4 h-4" />
              {t('accion.editar')}
            </button>
          </div>
        </div>
      )}

      {!empleado && !buscando && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-10 max-w-lg text-center text-sm text-slate-400">
          <IconUserCircle className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
          {yaBusco ? t('buscarPage.otroCodigo') : t('buscarPage.instruccion')}
        </div>
      )}

      {modalAbierto && empleado && (
        <EmpleadoFormModal
          empleado={empleado}
          onCerrar={() => setModalAbierto(false)}
          onGuardado={(msg) => {
            setModalAbierto(false);
            mostrarMensaje(msg, 'ok');
            refrescarEncontrado(empleado.codigoempleado);
          }}
        />
      )}
    </Layout>
  );
};
