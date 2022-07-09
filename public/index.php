<?php 

require_once __DIR__ . '/../includes/app.php';

use Controller\AuthController;
use Controller\AdminController;
use Controller\ApiController;
use Controller\ServicioController;
use Controller\CitaController;
use MVC\Router;

$router = new Router();

// Iniciar Session
$router->get('/login', [ AuthController::class, 'login' ]);
$router->post('/login', [ AuthController::class, 'login' ]);

//Cerrar Sesion
$router->get('/logout', [ AuthController::class, 'logout' ]);

//pagina de admin (privada)
$router->get('/admin', [ AdminController::class, 'index' ]);
$router->post('/admin', [ AdminController::class, 'index' ]);

// pagina principal para los clientes
$router->get('/', [ CitaController::class, 'index' ]);

//API de citas y servicios
$router->get('/api/servicios', [ ApiController::class, 'index' ]);
$router->post('/api/citas', [ ApiController::class, 'guardarCita' ]);
$router->post('/api/eliminar', [ ApiController::class, 'eliminarCita' ]);

//CRUD DE SERVICIOS
$router->get('/servicios', [ ServicioController::class, 'index' ]);
$router->get('/servicios/crear', [ ServicioController::class, 'crear' ]);
$router->post('/servicios/crear', [ ServicioController::class, 'crear' ]);
$router->get('/servicios/actualizar', [ ServicioController::class, 'actualizar' ]);
$router->post('/servicios/actualizar', [ ServicioController::class, 'actualizar' ]);
$router->post('/servicios/eliminar', [ ServicioController::class, 'eliminar' ]);


// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();