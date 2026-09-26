-- =========================================================
-- Practica Semana 9 - Parqueo Privados GT, S.A.
-- Tabla asignada: Tbl_Empleados
-- =========================================================

-- Si aun no existe la base de datos, crearla primero (ejecutar
-- esta linea por separado, conectado a la BD "postgres"):
CREATE DATABASE parqueo_privados_gt;

-- Conectarse a la base de datos parqueo_privados_gt antes de continuar.

CREATE TABLE IF NOT EXISTS Tbl_Empleados (
    CodigoEmpleado      SERIAL PRIMARY KEY,
    CodigoSede          INT NOT NULL,
    Nombres             VARCHAR(100) NOT NULL,
    Apellidos           VARCHAR(100) NOT NULL,
    DPI                 VARCHAR(20) NOT NULL UNIQUE,
    Puesto              VARCHAR(80) NOT NULL,
    Telefono            VARCHAR(20),
    CorreoElectronico   VARCHAR(150),
    FechaContratacion   DATE NOT NULL DEFAULT CURRENT_DATE,
    Salario             DECIMAL(12,2) NOT NULL,
    Genero              CHAR(1) CHECK (Genero IN ('M','F')),
    Estado              SMALLINT NOT NULL DEFAULT 1
);

COMMENT ON TABLE Tbl_Empleados IS 'Empleados de las distintas sedes de Parqueo Privados GT, S.A.';
