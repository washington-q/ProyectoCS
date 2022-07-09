<?php

namespace Model;

class Usuario extends ActiveRecord {

    // Base DE DATOS
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'cedula', 'nombre', 'email', 'password', 'telefono', 'roleId'];

    public $id;
    public $cedula;
    public $nombre;
    public $email;
    public $password;
    public $telefono;
    public $roleId;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->cedula = $args['cedula'] ?? null;
        $this->nombre = $args['nombre'] ?? null;
        $this->email = $args['email'] ?? null;
        $this->password = $args['password'] ?? null;
        $this->telefono = $args['telefono'] ?? null;
        $this->roleId = $args['roleId'] ?? 5;
    }

    // funcion para validar el correo y contraseña
    public function validarLogin(){
        if( empty(trim($this->email)) ){
            self::$alertas['error'][] = 'El email es obligatorio';
        }

        if( empty(trim($this->password)) ){
            self::$alertas['error'][] = 'El password es obligatorio';
        }

        return self::$alertas;
    }

    //hashear password
    public function hashearPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    // funcion para comprobar el password hasheado
    public function comprobarPassword( $password ){
        $resultado = password_verify($password, $this->password);

        if($resultado){
            $tipoUsuario = $this->getTipoUsuario();
            return $tipoUsuario;
        }

        self::$alertas['error'][] = 'El password es incorrecto';
        return false;
    }
}
