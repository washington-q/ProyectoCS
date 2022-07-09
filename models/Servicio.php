<?php

namespace Model;

class Servicio extends ActiveRecord {
    //Base de datos
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'nombre', 'precio', 'descripcion'];

    public $id;
    public $nombre;
    public $precio;
    public $descripcion;

    public function __construct( $args = [] ) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? null;
        $this->precio = $args['precio'] ?? null;
        $this->descripcion = $args['descripcion'] ?? null;
    }
}
