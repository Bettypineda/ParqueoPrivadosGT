import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/axios';
import { Layout } from '../components/Layout';
import { IconSearch, IconPlus, IconPencil, IconTrash, IconSort, IconEye, IconX } from '../components/icons';
import { EmpleadoFormModal, type Empleado } from '../components/EmpleadoFormModal';
import { EmpleadoInfoCard, infoPuesto, iconoGenero } from '../components/EmpleadoInfoCard';
import { StatCard } from '../components/StatCard';
import { IconUsers, IconBuilding, IconChip } from '../components/icons';
import { useIdioma } from '../context/IdiomaContext';

type Columna = keyof Empleado;
const FILAS_POR_PAGINA = 6;

export const EmpleadosPage = () => {
  const { t } = useIdioma();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'ok' | 'error' } | null>(null);

  const [busqueda, setBusqueda] = useState('');
  const [ordenCol, setOrdenCol] = useState<Columna>('codigoempleado');
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [pagina, setPagina] = useState(1);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState<Empleado | null>(null);

  const [detalle, setDetalle] = useState<Empleado | null>(null);

  const cargarEmpleados = async () => {
    setCargando(true);
    try {
      const { data } = await api.get('/empleados');
      if (data?.estado) {
        setEmpleados(data.datos || []);
      } else {
        mostrarMensaje(data?.mensaje || 'No se pudo cargar la lista de empleados.', 'error');
      }
    } catch (err: any) {
      mostrarMensaje(err.response?.data?.mensaje || 'Error al conectar con el servidor.', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const mostrarMensaje = (texto: string, tipo: 'ok' | 'error') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 4000);
  };

  const abrirNuevo = () => {
    setEmpleadoEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (emp: Empleado) => {
    setEmpleadoEditando(emp);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEmpleadoEditando(null);
  };

  const abrirDetalle = (emp: Empleado) => setDetalle(emp);
  const cerrarDetalle = () => setDetalle(null);

  const handleEliminar = async (emp: Empleado) => {
    const confirmado = window.confirm(
      `${t('confirmarEliminar.pre')} ${emp.nombres} ${emp.apellidos}${t('confirmarEliminar.post')}`
    );
    if (!confirmado) return;

    try {
      const { data } = await api.delete(`/empleados/${emp.codigoempleado}`);
      if (data?.estado) {
        mostrarMensaje(data.mensaje || 'Empleado eliminado correctamente.', 'ok');
        cargarEmpleados();
      } else {
        mostrarMensaje(data?.mensaje || 'No se pudo eliminar el empleado.', 'error');
      }
    } catch (err: any) {
      mostrarMensaje(err.response?.data?.mensaje || 'Error al conectar con el servidor.', 'error');
    }
  };

  const cambiarOrden = (col: Columna) => {
    if (ordenCol === col) {
      setOrdenAsc((v) => !v);
    } else {
      setOrdenCol(col);
      setOrdenAsc(true);
    }
  };

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    let lista = empleados;
    if (texto) {
      lista = empleados.filter((e) =>
        [e.nombres, e.apellidos, e.dpi, e.puesto, e.correoelectronico]
          .filter(Boolean)
          .some((campo) => campo.toString().toLowerCase().includes(texto))
      );
    }
    const ordenados = [...lista].sort((a, b) => {
      const va = a[ordenCol];
      const vb = b[ordenCol];
      if (va === vb) return 0;
      const resultado = va > vb ? 1 : -1;
      return ordenAsc ? resultado : -resultado;
    });
    return ordenados;
  }, [empleados, busqueda, ordenCol, ordenAsc]);

  const totalRegistrados = empleados.length;
  const totalActivos = empleados.filter((e) => e.estado === 1).length;
  const totalInactivos = totalRegistrados - totalActivos;
  const totalSedes = new Set(empleados.map((e) => e.codigosede)).size;
  const totalPuestos = new Set(empleados.map((e) => e.puesto)).size;

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / FILAS_POR_PAGINA));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const paginados = filtrados.slice(
    (paginaSegura - 1) * FILAS_POR_PAGINA,
    paginaSegura * FILAS_POR_PAGINA
  );

  const encabezado = (etiqueta: string, col: Columna) => (
    <th
      onClick={() => cambiarOrden(col)}
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 cursor-pointer select-none hover:text-slate-600"
    >
      <span className="flex items-center gap-1">
        {etiqueta}
        <IconSort className={`w-3.5 h-3.5 ${ordenCol === col ? 'text-blue-500' : 'text-slate-300'}`} />
      </span>
    </th>
  );

  return (
    <Layout titulo={t('empleados.titulo')}>
      <p className="text-sm text-slate-500 dark:text-slate-400 -mt-4 mb-6">
        {t('empleados.subtitulo')}
      </p>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard icono={IconUsers} etiqueta={t('stat.registrados')} valor={totalRegistrados} color="blue" />
        <StatCard icono={IconUsers} etiqueta={t('stat.activos')} valor={totalActivos} color="green" />
        <StatCard icono={IconUsers} etiqueta={t('stat.inactivos')} valor={totalInactivos} color="amber" />
        <StatCard icono={IconBuilding} etiqueta={t('stat.sedes')} valor={totalSedes} color="blue" />
        <StatCard icono={IconChip} etiqueta={t('stat.puestos')} valor={totalPuestos} color="pink" />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            {t('empleados.listado')}
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
              <IconSearch className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPagina(1);
                }}
                placeholder={t('empleados.buscarPlaceholder')}
                className="bg-transparent text-sm outline-none w-40 md:w-56 placeholder:text-slate-400 text-slate-800 dark:text-slate-100"
              />
            </div>
            <button
              onClick={abrirNuevo}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer whitespace-nowrap"
            >
              <IconPlus className="w-4 h-4" />
              {t('empleados.nuevo')}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {cargando ? (
            <p className="p-6 text-sm text-slate-400">{t('empleados.cargando')}</p>
          ) : filtrados.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">{t('empleados.sinResultados')}</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  {encabezado(t('tabla.codigo'), 'codigoempleado')}
                  {encabezado(t('tabla.sede'), 'codigosede')}
                  {encabezado(t('tabla.nombres'), 'nombres')}
                  {encabezado(t('tabla.apellidos'), 'apellidos')}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t('tabla.dpi')}</th>
                  {encabezado(t('tabla.puesto'), 'puesto')}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t('tabla.telefono')}</th>
                  {encabezado(t('tabla.salario'), 'salario')}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t('tabla.estado')}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">{t('tabla.acciones')}</th>
                </tr>
              </thead>
              <tbody>
                {paginados.map((emp) => {
                  const IconGenero = iconoGenero(emp.genero);
                  const { Icon: IconPuesto, clases: clasesPuesto } = infoPuesto(emp.puesto);
                  return (
                  <tr key={emp.codigoempleado} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{emp.codigoempleado}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{emp.codigosede}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <span
                          title={emp.genero === 'F' ? 'Femenino' : 'Masculino'}
                          className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${
                            emp.genero === 'F'
                              ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-500 dark:text-pink-400'
                              : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400'
                          }`}
                        >
                          <IconGenero className="w-3.5 h-3.5" />
                        </span>
                        {emp.nombres}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{emp.apellidos}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{emp.dpi}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${clasesPuesto}`}>
                        <IconPuesto className="w-3.5 h-3.5" />
                        {emp.puesto}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{emp.telefono}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Q{emp.salario}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          emp.estado === 1
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            emp.estado === 1 ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {emp.estado === 1 ? t('estado.activo') : t('estado.inactivo')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => abrirDetalle(emp)}
                          title={t('accion.verDetalle')}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                          <IconEye />
                        </button>
                        <button
                          onClick={() => abrirEditar(emp)}
                          title={t('accion.editar')}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition cursor-pointer"
                        >
                          <IconPencil />
                        </button>
                        <button
                          onClick={() => handleEliminar(emp)}
                          title={t('accion.eliminar')}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition cursor-pointer"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {filtrados.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            <span>
              {t('paginacion.mostrando')} {paginados.length} {t('paginacion.de')} {filtrados.length} {t('paginacion.resultados')}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={paginaSegura === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                ‹
              </button>
              <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold">
                {paginaSegura}
              </span>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaSegura === totalPaginas}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {modalAbierto && (
        <EmpleadoFormModal
          empleado={empleadoEditando}
          onCerrar={cerrarModal}
          onGuardado={(msg) => {
            cerrarModal();
            mostrarMensaje(msg, 'ok');
            cargarEmpleados();
          }}
        />
      )}

      {detalle && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    detalle.genero === 'F'
                      ? 'bg-pink-50 dark:bg-pink-500/10 text-pink-500 dark:text-pink-400'
                      : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400'
                  }`}
                >
                  {(() => {
                    const IconG = iconoGenero(detalle.genero);
                    return <IconG className="w-5 h-5" />;
                  })()}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-tight">
                    {detalle.nombres} {detalle.apellidos}
                  </h2>
                  <p className="text-xs text-slate-400">{t('empleado.numero')} #{detalle.codigoempleado}</p>
                </div>
              </div>
              <button
                onClick={cerrarDetalle}
                title={t('accion.cerrar')}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <EmpleadoInfoCard empleado={detalle} />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={cerrarDetalle}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {t('accion.cerrar')}
              </button>
              <button
                onClick={() => {
                  const emp = detalle;
                  cerrarDetalle();
                  abrirEditar(emp);
                }}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                <IconPencil className="w-4 h-4" />
                {t('accion.editar')}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
