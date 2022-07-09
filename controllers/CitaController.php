<?php

namespace Controller;

use MVC\Router;

class CitaController {

    // Funcion para mostrar el listado de citas en la vista y enviar scripts de js
    public static function index( Router $router ) {
        $router->render('client/index', [
            'alertas' => [],
            'script' => '
                <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                <script src="build/js/app.js"></script>',
        ]);
    }
}