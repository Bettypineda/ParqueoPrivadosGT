import { useState, type ReactNode, type ReactElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import {
  PandaLogo,
  IconDashboard,
  IconUsers,
  IconCar,
  IconBuilding,
  IconCalendar,
  IconSettings,
  IconSearch,
  IconLogout,
  IconChevronDown,
  IconUserCircle,
  IconSun,
  IconMoon,
} from './icons';
import { useTheme } from '../hooks/useTheme';
import { useIdioma } from '../context/IdiomaContext';
import { FloatingDecor } from './FloatingDecor';

interface NavSubItem {
  id: string;
  labelKey: string;
  to: string;
}

interface NavItem {
  id: string;
  labelKey: string;
  icon: (props: { className?: string }) => ReactElement;
  to?: string;
  disabled?: boolean;
  subItems?: NavSubItem[];
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: IconDashboard, to: '/dashboard' },
  {
    id: 'empleados',
    labelKey: 'nav.empleados',
    icon: IconUsers,
    subItems: [
      { id: 'consultar', labelKey: 'nav.consultar', to: '/empleados' },
      { id: 'agregar', labelKey: 'nav.agregar', to: '/empleados/agregar' },
      { id: 'editar', labelKey: 'nav.editar', to: '/empleados/buscar?accion=editar' },
      { id: 'eliminar', labelKey: 'nav.eliminar', to: '/empleados/buscar?accion=eliminar' },
      { id: 'buscar', labelKey: 'nav.buscar', to: '/empleados/buscar' },
    ],
  },
  { id: 'sedes', labelKey: 'nav.sedes', icon: IconBuilding, disabled: true },
  { id: 'vehiculos', labelKey: 'nav.vehiculos', icon: IconCar, disabled: true },
  { id: 'reservaciones', labelKey: 'nav.reservaciones', icon: IconCalendar, disabled: true },
];

/** Separa una ruta de menu en su path y sus parametros de query, para poder
 * comparar cual sub-item esta activo aunque varios compartan el mismo path
 * (p. ej. Editar/Eliminar/Buscar todos viven en /empleados/buscar). */
const partesRuta = (to: string) => {
  const [path, query] = to.split('?');
  return { path, query: query ?? null };
};

export const Layout = ({ children, titulo }: { children: ReactNode; titulo?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tema, alternarTema } = useTheme();
  const { idioma, alternarIdioma, t } = useIdioma();
  const grupoDeRutaActual = NAV_ITEMS.find(
    (item) => item.subItems && location.pathname.startsWith(partesRuta(item.subItems[0].to).path)
  )?.id;
  const [menuAbierto, setMenuAbierto] = useState<string | null>(grupoDeRutaActual ?? null);
  const [configAbierta, setConfigAbierta] = useState(false);

  const esRutaActiva = (to?: string) => {
    if (!to) return false;
    const { path, query } = partesRuta(to);
    if (location.pathname !== path) return false;

    const paramsActuales = new URLSearchParams(location.search);
    if (query === null) {
      // Esta entrada no distingue por query: solo esta activa si no hay
      // un parametro "accion" definiendo otro estado en la misma ruta.
      return !paramsActuales.get('accion');
    }
    const paramsEsperados = new URLSearchParams(query);
    for (const [clave, valor] of paramsEsperados) {
      if (paramsActuales.get(clave) !== valor) return false;
    }
    return true;
  };

  const grupoActivo = (item: NavItem) =>
    !!item.subItems && item.subItems.some((s) => location.pathname === partesRuta(s.to).path);

  const cerrarSesion = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // si el logout en el servidor falla, de todas formas cerramos la sesion local
    } finally {
      sessionStorage.clear();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-200 dark:border-slate-800">
          <PandaLogo className="w-9 h-9 text-blue-600 dark:text-blue-400" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-blue-700 dark:text-blue-400 tracking-tight">PARQUEOS GT</p>
            <p className="text-[10px] text-slate-400 -mt-0.5">Parqueo Privados GT, S.A.</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            if (item.subItems) {
              const activo = grupoActivo(item);
              const abierto = menuAbierto === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => setMenuAbierto((actual) => (actual === item.id ? null : item.id))}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                      activo
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-5 h-5" />
                      {t(item.labelKey)}
                    </span>
                    <IconChevronDown className={`w-4 h-4 transition-transform ${abierto ? 'rotate-180' : ''}`} />
                  </button>
                  {abierto && (
                    <div className="ml-8 mt-1 space-y-0.5">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.id}
                          to={sub.to}
                          className={`block px-3 py-1.5 rounded-lg text-sm transition ${
                            esRutaActiva(sub.to)
                              ? 'text-blue-700 dark:text-blue-400 font-semibold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {t(sub.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (item.disabled) {
              return (
                <div
                  key={item.id}
                  title={t('nav.proximamente')}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 dark:text-slate-700 cursor-not-allowed select-none"
                >
                  <Icon className="w-5 h-5" />
                  {t(item.labelKey)}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.to!}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  esRutaActiva(item.to)
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setConfigAbierta((v) => !v)}
            className="w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <IconSettings className="w-5 h-5" />
              {t('nav.configuracion')}
            </span>
            <IconChevronDown className={`w-4 h-4 transition-transform ${configAbierta ? 'rotate-180' : ''}`} />
          </button>

          {configAbierta && (
            <div className="mt-2 px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{t('topbar.tema')}</p>
                <button
                  onClick={alternarTema}
                  className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300"
                >
                  {tema === 'dark' ? (
                    <IconSun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <IconMoon className="w-4 h-4 text-blue-500" />
                  )}
                  {tema === 'dark' ? t('topbar.modoClaro') : t('topbar.modoOscuro')}
                </button>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{t('topbar.idioma')}</p>
                <button
                  onClick={alternarIdioma}
                  className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-1 py-1 text-xs font-semibold cursor-pointer"
                >
                  <span
                    className={`px-2.5 py-1 rounded-full transition ${
                      idioma === 'es' ? 'bg-blue-600 text-white' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    ES
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full transition ${
                      idioma === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    EN
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <FloatingDecor />

        {/* Topbar */}
        <header className="relative z-10 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <IconSearch className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('topbar.buscarPlaceholder')}
              className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 text-slate-700 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <IconUserCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              {t('topbar.usuario')}
            </div>
            <button
              onClick={cerrarSesion}
              className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 transition cursor-pointer"
            >
              <IconLogout className="w-4.5 h-4.5" />
              {t('topbar.salir')}
            </button>
          </div>
        </header>

        <main className="relative z-10 flex-1 p-6 md:p-8">
          {titulo && <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{titulo}</h1>}
          {children}
        </main>
      </div>
    </div>
  );
};
