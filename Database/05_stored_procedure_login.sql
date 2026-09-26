-- =========================================================
-- Stored Procedure - Login de usuarios
-- Estructura de respuesta JSON: { estado, mensaje, datos }
-- =========================================================
CREATE OR REPLACE FUNCTION sp_usuario_login(p_correo VARCHAR, p_password VARCHAR)
RETURNS JSON AS $$
DECLARE
    v_usuario RECORD;
    v_datos   JSON;
BEGIN
    SELECT u.CodigoUsuario, u.CodigoEmpleado, u.CorreoElectronico, u.Contrasena, e.Puesto
    INTO v_usuario
    FROM Tbl_Usuarios u
    INNER JOIN Tbl_Empleados e ON e.CodigoEmpleado = u.CodigoEmpleado
    WHERE u.CorreoElectronico = p_correo AND u.Estado = 1;

    IF NOT FOUND THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Correo o contrasena incorrectos',
            'datos', null
        );
    END IF;

    IF v_usuario.contrasena <> p_password THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Correo o contrasena incorrectos',
            'datos', null
        );
    END IF;

    v_datos := json_build_object(
        'codigousuario', v_usuario.codigousuario,
        'codigoempleado', v_usuario.codigoempleado,
        'correo', v_usuario.correoelectronico,
        'puesto', v_usuario.puesto
    );

    RETURN json_build_object(
        'estado', true,
        'mensaje', 'Login exitoso',
        'datos', v_datos
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'estado', false,
            'mensaje', 'Error al iniciar sesion: ' || SQLERRM,
            'datos', null
        );
END;
$$ LANGUAGE plpgsql;
