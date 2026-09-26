import { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Layout } from '../components/Layout';
import { IconUsers, IconChip, IconBuilding, IconCar } from '../components/icons';
import { StatCard } from '../components/StatCard';
import { useIdioma } from '../context/IdiomaContext';

interface Empleado {
  codigoempleado: number;
  codigosede: number;
  puesto: string;
  estado: number;
}

export const DashboardPage = () => {
  const { t } = useIdioma();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const { data } = await api.get('/empleados');
        if (data?.estado) setEmpleados(data.datos || []);
      } catch {
        // se muestra igual el dashboard en 0 si el backend no responde
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const total = empleados.length;
  const activos = empleados.filter((e) => e.estado === 1).length;
  const inactivos = total - activos;
  const sedes = new Set(empleados.map((e) => e.codigosede)).size;
  const puestos = new Set(empleados.map((e) => e.puesto)).size;

  return (
    <Layout titulo={t('nav.dashboard')}>
      <p className="text-sm text-slate-500 -mt-4 mb-6">{t('dashboard.subtitulo')}</p>

      {cargando ? (
        <p className="text-sm text-slate-400">{t('dashboard.cargando')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icono={IconUsers} etiqueta={t('stat.registrados')} valor={total} color="blue" />
          <StatCard icono={IconUsers} etiqueta={t('stat.activos')} valor={activos} color="green" />
          <StatCard icono={IconUsers} etiqueta={t('stat.inactivos')} valor={inactivos} color="amber" />
          <StatCard icono={IconBuilding} etiqueta={t('stat.sedes')} valor={sedes} color="blue" />
          <StatCard icono={IconChip} etiqueta={t('stat.puestos')} valor={puestos} color="blue" />
          <StatCard icono={IconCar} etiqueta={t('stat.vehiculos')} valor="—" color="amber" />
        </div>
      )}

      {/*
        Nota de avance (solo para desarrollo, no se muestra al usuario final):
        Los módulos de Sedes, Vehículos y Reservaciones se irán habilitando
        conforme se agreguen al backend. Por ahora, el módulo de Empleados
        (menú lateral) ya permite consultar, agregar, editar y eliminar
        registros de forma completa.
      */}
    </Layout>
  );
};
