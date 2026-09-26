-- =========================================================
-- Modulo de Login - Parqueo Privados GT, S.A.
-- Tabla de usuarios (cada usuario esta ligado a un empleado)
-- y tabla de tokens invalidados (para el logout).
-- =========================================================

CREATE TABLE IF NOT EXISTS Tbl_Usuarios (
    CodigoUsuario       SERIAL PRIMARY KEY,
    CodigoEmpleado       INT NOT NULL REFERENCES Tbl_Empleados(CodigoEmpleado),
    CorreoElectronico    VARCHAR(150) NOT NULL UNIQUE,
    Contrasena           VARCHAR(255) NOT NULL,
    Estado               SMALLINT NOT NULL DEFAULT 1
);

COMMENT ON TABLE Tbl_Usuarios IS 'Usuarios que pueden iniciar sesion en el sistema, ligados a un empleado.';

-- Tokens invalidados manualmente (cuando el usuario cierra sesion).
CREATE TABLE IF NOT EXISTS token_blacklist (
    token         VARCHAR(500) PRIMARY KEY,
    expiry_date   TIMESTAMP NOT NULL
);
