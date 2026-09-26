-- =========================================================
-- 5 registros de prueba - Tbl_Empleados
-- Se insertan llamando al propio stored procedure de agregar,
-- asi de una vez queda comprobado que funciona.
-- =========================================================

SELECT sp_empleado_agregar(1, 'Maria Fernanda', 'Lopez Ramirez', '2547896541201', 'Cajera',            '55123456', 'mlopez@parqueosgt.com',  '2023-02-10', 3200.00, 'F');
SELECT sp_empleado_agregar(1, 'Carlos Andres',  'Perez Gonzalez', '1897456321502', 'Supervisor',        '55234567', 'cperez@parqueosgt.com',  '2022-06-01', 4800.50, 'M');
SELECT sp_empleado_agregar(2, 'Ana Lucia',      'Garcia Morales', '3021458796103', 'Cajera',            '55345678', 'agarcia@parqueosgt.com', '2024-01-15', 3200.00, 'F');
SELECT sp_empleado_agregar(2, 'Jose Miguel',    'Ramirez Solis',  '4159873201804', 'Vigilante',         '55456789', 'jramirez@parqueosgt.com','2021-09-20', 2950.75, 'M');
SELECT sp_empleado_agregar(3, 'Paola Sofia',    'Chavez Castillo','5268741930705', 'Jefe de Operaciones','55567890','pchavez@parqueosgt.com', '2020-03-05', 6500.00, 'F');

-- Verificacion rapida
SELECT sp_empleado_consultar();
