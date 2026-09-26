import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// La sesion (accessToken/refreshToken) se guarda en sessionStorage, no en
// localStorage: asi se borra sola al cerrar la pestaña o el navegador, y la
// proxima vez hay que volver a iniciar sesion (a diferencia de la preferencia
// de idioma/tema, que si se recuerda entre visitas via localStorage).

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:3000/auth/refresh', {
          refreshToken,
        });

        const { accessToken } = response.data;
        sessionStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        sessionStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
