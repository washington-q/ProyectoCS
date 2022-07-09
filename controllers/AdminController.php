<?php

namespace Controller;

use Model\AdminCita;
use MVC\Router;

class AdminController {

    // Funcion para mostrar el buscador de citas por fechas y buscar cias por fehcas
    public static function index(Router $router) {
        session_start();

        $role = $_SESSION['role'] ?? '';
        //verificar si ha iniciado sesion
        if (!isset($_SESSION['logged_in']) || $role != 'admin' ) {
            header('Location: /login');
        }

        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        $fecha = explode('-', $fecha);

        if(!checkdate($fecha[1], $fecha[2], $fecha[0])){
            header('Location: /admin');
        } 

        $fecha = implode('-', $fecha);

        // Consultar la base de datos
        $consulta = "SELECT citas.id, citas.hora, usuarios.nombre as cliente, ";
        $consulta .= " usuarios.email, servicios.nombre as servicio, servicios.precio  ";
        $consulta .= " FROM citas  ";
        $consulta .= " INNER JOIN usuarios ";
        $consulta .= " ON citas.usuarioId=usuarios.id  ";
        $consulta .= " INNER JOIN citas_servicios ";
        $consulta .= " ON citas_servicios.citaId=citas.id ";
        $consulta .= " INNER JOIN servicios ";
        $consulta .= " ON servicios.id=citas_servicios.servicioId ";
        $consulta .= " WHERE fecha = '${fecha}' ORDER BY id;";

        $citas = AdminCita::SQL($consulta);

        $router->render('admin/index', [
            'nombre' => $_SESSION['nombre'] ?? '',
            'citas' => $citas,
            'fecha' => $fecha,
            'script' => '<script src="build/js/buscador.js"></script>'
        ]);
    }
}
