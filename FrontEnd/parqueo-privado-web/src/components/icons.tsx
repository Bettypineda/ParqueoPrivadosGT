// Set de iconos propios (SVG en linea) y logo de panda para Parqueo Privados GT.
// No dependen de ninguna libreria externa de iconos: son sencillos y 100% personalizados.

type IconProps = { className?: string };

/** Logo: panda en azul y blanco, para la marca del sistema. */
export const PandaLogo = ({ className = 'w-9 h-9' }: IconProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* orejas */}
    <circle cx="14" cy="14" r="9" className="fill-blue-600" />
    <circle cx="50" cy="14" r="9" className="fill-blue-600" />
    {/* cara */}
    <circle cx="32" cy="34" r="24" className="fill-white" stroke="currentColor" strokeWidth="2" />
    {/* parches de ojos */}
    <ellipse cx="21" cy="32" rx="7" ry="9" className="fill-blue-600" transform="rotate(-12 21 32)" />
    <ellipse cx="43" cy="32" rx="7" ry="9" className="fill-blue-600" transform="rotate(12 43 32)" />
    {/* ojos */}
    <circle cx="22" cy="33" r="2.2" className="fill-white" />
    <circle cx="42" cy="33" r="2.2" className="fill-white" />
    {/* nariz */}
    <ellipse cx="32" cy="41" rx="3.2" ry="2.2" className="fill-blue-900" />
  </svg>
);

export const IconDashboard = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="5" rx="1.5" />
    <rect x="13" y="11" width="8" height="10" rx="1.5" />
    <rect x="3" y="14" width="8" height="7" rx="1.5" />
  </svg>
);

export const IconUsers = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c0-3.6 2.9-6 5.5-6s5.5 2.4 5.5 6" strokeLinecap="round" />
    <circle cx="17.5" cy="8.5" r="2.6" />
    <path d="M15.8 14.2c2.4.2 4.7 2.3 4.7 5.8" strokeLinecap="round" />
  </svg>
);

export const IconCar = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 16l1.2-5.2A2 2 0 0 1 7.1 9.4h9.8a2 2 0 0 1 1.9 1.4L20 16" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2.5" y="16" width="19" height="4" rx="1.4" />
    <circle cx="7" cy="20.3" r="1.4" />
    <circle cx="17" cy="20.3" r="1.4" />
  </svg>
);

export const IconBuilding = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="3" width="11" height="18" rx="1" />
    <path d="M15 8h5v13h-5" />
    <path d="M7.5 7h1M7.5 10.5h1M7.5 14h1M11 7h1M11 10.5h1M11 14h1" strokeLinecap="round" />
  </svg>
);

export const IconCalendar = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3.5 10h17" strokeLinecap="round" />
  </svg>
);

export const IconSettings = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.5H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.5a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

export const IconSearch = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

export const IconPlus = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

export const IconPencil = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 20l.9-3.6L16.6 4.7a1.5 1.5 0 0 1 2.1 0l.6.6a1.5 1.5 0 0 1 0 2.1L7.6 19.1 4 20Z" strokeLinejoin="round" />
    <path d="M14.5 6.8l2.7 2.7" strokeLinecap="round" />
  </svg>
);

export const IconTrash = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 7h16M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" strokeLinecap="round" />
    <path d="M6 7l1 13.5A1.5 1.5 0 0 0 8.5 22h7a1.5 1.5 0 0 0 1.5-1.5L18 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6" strokeLinecap="round" />
  </svg>
);

export const IconLogout = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9" strokeLinecap="round" />
    <path d="M16 16l4-4-4-4M20 12H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronDown = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSort = ({ className = 'w-3.5 h-3.5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M8 9l4-5 4 5M8 15l4 5 4-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconUserCircle = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.3 18.5a6.5 6.5 0 0 1 11.4 0" strokeLinecap="round" />
  </svg>
);

export const IconChip = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <rect x="10" y="10" width="4" height="4" rx="0.5" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" strokeLinecap="round" />
  </svg>
);

export const IconSun = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="4.2" />
    <path
      d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6"
      strokeLinecap="round"
    />
  </svg>
);

export const IconMoon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M20.5 14.5a8.5 8.5 0 1 1-9-11 7 7 0 0 0 9 11Z" strokeLinejoin="round" />
  </svg>
);

export const IconEye = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
);

export const IconX = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

export const IconIdCard = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <circle cx="8" cy="12" r="2.3" />
    <path d="M13.5 10h5M13.5 14h5M5.5 16.5c.5-1.6 1.6-2.5 2.5-2.5s2 .9 2.5 2.5" strokeLinecap="round" />
  </svg>
);

export const IconBriefcase = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

export const IconPhone = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path
      d="M5 4.5h3.2l1.3 4-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4 1.3V19a1.7 1.7 0 0 1-1.9 1.7A15.5 15.5 0 0 1 3.3 6.4 1.7 1.7 0 0 1 5 4.5Z"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMail = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCash = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 9v.01M18 15v.01" strokeLinecap="round" />
  </svg>
);

export const IconVenus = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="9" r="6" />
    <path d="M12 15v7M8.5 19h7" strokeLinecap="round" />
  </svg>
);

export const IconMars = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="10" cy="14" r="6" />
    <path d="M14.5 9.5 20 4M14 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconShieldCheck = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3l7 3v5.5c0 4.6-3 8.2-7 9.5-4-1.3-7-4.9-7-9.5V6l7-3Z" strokeLinejoin="round" />
    <path d="M9 12.3l2 2 4-4.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCashRegister = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="11" width="16" height="9" rx="1.5" />
    <path d="M6 11V8a6 6 0 0 1 12 0v3" />
    <path d="M9 15.5h1.5M13.5 15.5H15" strokeLinecap="round" />
  </svg>
);

export const IconUserTie = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="7" r="3.4" />
    <path d="M5.5 21c0-4 2.9-6.6 6.5-6.6s6.5 2.6 6.5 6.6" strokeLinecap="round" />
    <path d="M12 14.4l-1.3 2.4 1.3 1.6 1.3-1.6-1.3-2.4Z" strokeLinejoin="round" />
  </svg>
);

/** Hojita para el fondo decorativo flotante (el toque personal de la marca). */
export const IconLeaf = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
    <path d="M4 20c7-1 14-6 16-16-10 1-15 7-16 16Z" strokeLinejoin="round" />
    <path d="M6 18c3-4 7-7 12-9" strokeLinecap="round" />
  </svg>
);
