# Parqueo Privados GT

Sistema de gestion para Parqueo Privados GT, S.A. - Practica Semana 9 (CRUD de Empleados con login y JWT).

## Stack

- Backend: NestJS + TypeORM + PostgreSQL (stored procedures)
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Base de datos: PostgreSQL 18 en Docker
- Autenticacion: JWT (access token + refresh token) con blacklist de tokens en logout

## Estructura

```
Backend/parqueo-privado-api   -> API REST (NestJS)
FrontEnd/parqueo-privado-web  -> Interfaz web (React)
Database                      -> Scripts SQL (tabla, stored procedures, datos de prueba)
```

## Como correrlo

### 1. Base de datos

Levantar Postgres en Docker:

```
docker pull postgres:18
docker volume create postgres_desarrolloweb_data
docker run --name postgres_desarrolloweb -e POSTGRES_PASSWORD=Desarrolloweb_2026* -p 5432:5432 -v postgres_desarrolloweb_data:/var/lib/postgresql/data -d postgres:18
```

Crear la base `parqueo_privados_gt` y correr, en orden, los scripts de la carpeta `Database/` (en pgAdmin, Query Tool).

### 2. Backend

```
cd Backend/parqueo-privado-api
npm install
```

Crear un archivo `.env` (no se sube al repo) con:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD="Desarrolloweb_2026*"
DB_NAME=parqueo_privados_gt
PORT=3000
JWT_SECRET=tu_secreto
JWT_EXPIRATION=15s
JWT_REFRESH_SECRET=tu_secreto_refresh
JWT_REFRESH_EXPIRATION=7d
```

```
npm run start:dev
```

### 3. Frontend

```
cd FrontEnd/parqueo-privado-web
npm install
npm run dev
```

Entrar a `http://localhost:3001`. Usuario de prueba: `admin@parqueosgt.com` / `Admin2026*`.
