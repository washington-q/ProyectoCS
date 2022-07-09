<?php 

require 'funciones.php';
require 'database.php';
require __DIR__ . '/../vendor/autoload.php';

//able cors
header("Access-Control-Allow-Origin: *");

// Conectarnos a la base de datos
use Model\ActiveRecord;
ActiveRecord::setDB($db);