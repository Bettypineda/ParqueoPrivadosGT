-- =========================================================
-- Usuario de prueba para iniciar sesion.
-- Se liga al empleado "Paola Sofia Chavez Castillo" (Jefe de
-- Operaciones) que ya se inserto en 03_datos_prueba.sql.
-- =========================================================
INSERT INTO Tbl_Usuarios (CodigoEmpleado, CorreoElectronico, Contrasena, Estado)
SELECT CodigoEmpleado, 'admin@parqueosgt.com', 'Admin2026*', 1
FROM Tbl_Empleados
WHERE DPI = '5268741930705'
LIMIT 1;

-- Verificacion rapida
SELECT sp_usuario_login('admin@parqueosgt.com', 'Admin2026*');
