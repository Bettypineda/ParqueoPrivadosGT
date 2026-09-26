import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { PandaLogo } from '../components/icons';
import { FloatingDecor } from '../components/FloatingDecor';
import { useIdioma } from '../context/IdiomaContext';

export const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useIdioma();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Peticion al endpoint de login del backend
      const response = await api.post('/auth/login', { correo, password });

      if (response.data && response.data.estado) {
        const { accessToken, refreshToken } = response.data;

        // Se guardan en sessionStorage: la sesion dura mientras la pestaña o
        // el navegador siga abierto, y se borra sola al cerrarlo.
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        // Redirigimos al panel principal de acceso
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Error en el inicio de sesión:', err);
      setError(err.response?.data?.message || t('login.errorDefault'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Fondo decorativo compartido con el resto del sistema (pandas y hojas flotando) */}
      <FloatingDecor />

      {/* Resplandor azul futurista detras de la tarjeta */}
      <div
        className="absolute w-[32rem] h-[32rem] rounded-full bg-blue-600/25 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none -translate-x-40 translate-y-32"
        aria-hidden="true"
      />

      <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-3xl shadow-[0_0_70px_-15px_rgba(37,99,235,0.55)] p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-700/10 border border-blue-400/30 flex items-center justify-center shadow-[0_0_30px_-6px_rgba(59,130,246,0.7)]">
            <PandaLogo className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            PARQUEO<span className="text-blue-400">S</span> GT
          </h1>
          <div className="h-px w-24 mx-auto my-3 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <p className="text-sm text-slate-400">{t('login.subtitulo')}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-300/80 mb-2">
              {t('login.correo')}
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder={t('login.correoPlaceholder')}
              required
              className="w-full bg-slate-950/80 border border-blue-500/20 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-300/80 mb-2">
              {t('login.contrasena')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-950/80 border border-blue-500/20 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 rounded-xl text-sm transition cursor-pointer disabled:opacity-50 shadow-[0_0_25px_-6px_rgba(59,130,246,0.8)]"
          >
            {loading ? t('login.verificando') : t('login.boton')}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500 mt-6">Parqueo Privados GT, S.A.</p>
      </div>
    </div>
  );
};
