<?php

namespace Controller;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;
use Model\Usuario;

class ApiController {

    // Funcion para generar la api de los servicios
    public static function index() {
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    // Funcion para guardar las citas
    public static function guardarCita() {

        //crear el cliente
        $cliente = new Usuario($_POST);
        
        //verficar si el clinte ya tiene una cita reservada
        $resultado = Usuario::where('email', $cliente->email);
        if($resultado){
            echo json_encode(['error' => 'El cliente ya tiene una cita reservada']);
            return;
        }
        
        //guardar el cliente en la base ded datos
        $respuesta = $cliente->guardar();
        
        //creamos la cita
        $cita = new Cita($_POST);
        $cita->usuarioId = $respuesta['id'];
        $citaResultado = $cita->guardar();
        $idCita = $citaResultado['id'];

        // Almacena los Servicios con el ID de la Cita
        $idServicios = explode(",", $_POST['servicios']);
        foreach($idServicios as $idServicio) {
            $args = [
                'citaId' => $idCita,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }

        echo json_encode(['resultado' => $citaResultado]);
    }

    // Funcion para eliminar las citas
    public static function eliminarCita() {
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $id = $_POST['id'];
            $cita = Cita::find($id);
            $resultado = $cita->eliminar();

            header('Location: ' . $_SERVER['HTTP_REFERER']);
        }
    }


}

