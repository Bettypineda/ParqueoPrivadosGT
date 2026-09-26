-- =========================================================
-- Stored Procedures CRUD - Tbl_Empleados
-- Estructura de respuesta JSON: { estado, mensaje, datos }
-- Ajusta los nombres de las llaves si en clase se manejo otra
-- estructura (por ejemplo: exito / message / data).
-- =========================================================
-- ---------------------------------------------------------
-- 1) CONSULTAR (listar todos los empleados activos)
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION sp_empleado_consultar()
RETURNS JSON AS $$
DECLARE
    v_datos JSON;
BEGIN
    SELECT COALESCE(json_agg(t), '[]'::json) INTO v_datos
    FROM (
        SELECT * FROM Tbl_Empleados
        WHERE Estado = 1
        ORDER BY CodigoEmpleado
    ) t;

    RETURN json_build_object(
        'estado', true,
        'mensaje', 'Consulta realizada correctamente',
        'datos', v_datos
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Error al consultar empleados: ' || SQLERRM,
            'datos', '[]'::json
        );
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 2) BUSCAR (por codigo de empleado)
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION sp_empleado_buscar(p_codigo INT)
RETURNS JSON AS $$
DECLARE
    v_existe INT;
    v_datos  JSON;
BEGIN
    SELECT COUNT(*) INTO v_existe FROM Tbl_Empleados WHERE CodigoEmpleado = p_codigo;

    IF v_existe = 0 THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'No existe un empleado con el codigo ' || p_codigo,
            'datos', '[]'::json
        );
    END IF;

    SELECT row_to_json(t) INTO v_datos
    FROM (SELECT * FROM Tbl_Empleados WHERE CodigoEmpleado = p_codigo) t;

    RETURN json_build_object(
        'estado', true,
        'mensaje', 'Empleado encontrado',
        'datos', v_datos
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Error al buscar el empleado: ' || SQLERRM,
            'datos', '[]'::json
        );
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 3) AGREGAR
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION sp_empleado_agregar(
    p_codigosede        INT,
    p_nombres           VARCHAR,
    p_apellidos         VARCHAR,
    p_dpi               VARCHAR,
    p_puesto            VARCHAR,
    p_telefono          VARCHAR,
    p_correo            VARCHAR,
    p_fechacontratacion DATE,
    p_salario           DECIMAL,
    p_genero            CHAR
)
RETURNS JSON AS $$
DECLARE
    v_existe       INT;
    v_nuevo_codigo INT;
    v_datos        JSON;
BEGIN
    SELECT COUNT(*) INTO v_existe FROM Tbl_Empleados WHERE DPI = p_dpi;

    IF v_existe > 0 THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Ya existe un empleado registrado con el DPI ' || p_dpi,
            'datos', '[]'::json
        );
    END IF;

    INSERT INTO Tbl_Empleados (
        CodigoSede, Nombres, Apellidos, DPI, Puesto, Telefono,
        CorreoElectronico, FechaContratacion, Salario, Genero, Estado
    ) VALUES (
        p_codigosede, p_nombres, p_apellidos, p_dpi, p_puesto, p_telefono,
        p_correo, p_fechacontratacion, p_salario, p_genero, 1
    ) RETURNING CodigoEmpleado INTO v_nuevo_codigo;

    SELECT row_to_json(t) INTO v_datos
    FROM (SELECT * FROM Tbl_Empleados WHERE CodigoEmpleado = v_nuevo_codigo) t;

    RETURN json_build_object(
        'estado', true,
        'mensaje', 'Empleado agregado correctamente',
        'datos', v_datos
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Error al agregar el empleado: ' || SQLERRM,
            'datos', '[]'::json
        );
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 4) EDITAR
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION sp_empleado_editar(
    p_codigo            INT,
    p_codigosede        INT,
    p_nombres           VARCHAR,
    p_apellidos         VARCHAR,
    p_dpi               VARCHAR,
    p_puesto            VARCHAR,
    p_telefono          VARCHAR,
    p_correo            VARCHAR,
    p_fechacontratacion DATE,
    p_salario           DECIMAL,
    p_genero            CHAR
)
RETURNS JSON AS $$
DECLARE
    v_existe        INT;
    v_dpi_duplicado INT;
    v_datos         JSON;
BEGIN
    SELECT COUNT(*) INTO v_existe FROM Tbl_Empleados WHERE CodigoEmpleado = p_codigo;

    IF v_existe = 0 THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'No existe un empleado con el codigo ' || p_codigo,
            'datos', '[]'::json
        );
    END IF;

    SELECT COUNT(*) INTO v_dpi_duplicado
    FROM Tbl_Empleados
    WHERE DPI = p_dpi AND CodigoEmpleado <> p_codigo;

    IF v_dpi_duplicado > 0 THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'El DPI ' || p_dpi || ' ya pertenece a otro empleado',
            'datos', '[]'::json
        );
    END IF;

    UPDATE Tbl_Empleados SET
        CodigoSede        = p_codigosede,
        Nombres           = p_nombres,
        Apellidos         = p_apellidos,
        DPI               = p_dpi,
        Puesto            = p_puesto,
        Telefono          = p_telefono,
        CorreoElectronico = p_correo,
        FechaContratacion = p_fechacontratacion,
        Salario           = p_salario,
        Genero            = p_genero
    WHERE CodigoEmpleado = p_codigo;

    SELECT row_to_json(t) INTO v_datos
    FROM (SELECT * FROM Tbl_Empleados WHERE CodigoEmpleado = p_codigo) t;

    RETURN json_build_object(
        'estado', true,
        'mensaje', 'Empleado actualizado correctamente',
        'datos', v_datos
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Error al actualizar el empleado: ' || SQLERRM,
            'datos', '[]'::json
        );
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------
-- 5) ELIMINAR
-- Maneja: exitoso, no existe, registros relacionados (FK) y error
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION sp_empleado_eliminar(p_codigo INT)
RETURNS JSON AS $$
DECLARE
    v_existe INT;
BEGIN
    SELECT COUNT(*) INTO v_existe FROM Tbl_Empleados WHERE CodigoEmpleado = p_codigo;

    IF v_existe = 0 THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'No existe un empleado con el codigo ' || p_codigo,
            'datos', '[]'::json
        );
    END IF;

    DELETE FROM Tbl_Empleados WHERE CodigoEmpleado = p_codigo;

    RETURN json_build_object(
        'estado', true,
        'mensaje', 'Empleado eliminado correctamente',
        'datos', '[]'::json
    );
EXCEPTION
    WHEN foreign_key_violation THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'No se puede eliminar el empleado porque tiene registros relacionados (turnos, reservaciones, incidencias, etc.)',
            'datos', '[]'::json
        );
    WHEN OTHERS THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Error al eliminar el empleado: ' || SQLERRM,
            'datos', '[]'::json
        );
END;
$$ LANGUAGE plpgsql;
