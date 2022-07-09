<?php

namespace Controller;

use Model\Usuario;
use MVC\Router;

class AuthController {

    // Funcion para mostrar el formulario de login en la vista e iniciar sesion
    public static function login( Router $router ) {
        $alertas = [];
        $method = $_SERVER['REQUEST_METHOD'];

        if( $method === 'POST' ){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();

            if(empty($alertas)){
                // Comprobra que el usuario existe
                $usuario = Usuario::where('email', $auth->email);
                if($usuario){
                    //verificar password
                    $usuarioVerificado = $usuario->comprobarPassword( $_POST['password'] );

                    if($usuarioVerificado){
                        // autenticar usuario
                        session_start();

                        $_SESSION['uid'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['role'] = $usuarioVerificado;
                        $_SESSION['logged_in'] = true;

                        
                        // Iniciar Session
                        header('Location: /'. $usuarioVerificado);
                    }

                }else{
                    Usuario::setAlerta( 'error', 'Usuario no encontrado' );
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/login', [
            'title' => 'Login',
            'alertas' => $alertas
        ]);
    }

    // Funcion para cerrar sesion
    public static function logout() {
        session_start();
        $_SESSION = [];
        header('Location: /login');
    }
}
