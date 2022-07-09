<h1 class="nombre-pagina">Panel de Administracion</h1>

<?php 
    include_once __DIR__ . '/../templates/barra.php';
?>

<h2>Buscar Citas</h2>
<div class="busquedad">
    <form class="formulario" method="POST">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input 
                type="date"
                id="fecha"
                name="fecha"
                value="<?php echo $fecha ?? ''; ?>"
            >
        </div>
    </form>
</div>

<?php 
    if(count($citas) == 0){
        echo '<h2>No hay Citas en esta Fecha</h2>';
    }
?>

<div id="citas-admin">
    <ul class="citas">
        <?php 
        $idCita = 0;
        $total = 0;
        foreach($citas as $key => $cita): 
            if($idCita != $cita->id): 
        ?>
            <li>
                <p>ID: <span><?php echo $cita->id ?></span></p>
                <p>Hora: <span><?php echo $cita->hora ?></span></p>
                <p class="capitalize">Cliente: <span><?php echo $cita->cliente ?></span></p>
                <p>Email: <span><?php echo $cita->email ?></span></p>
                <h3>Servicios: </h3>
        <?php 
            $idCita = $cita->id;
            endif;
        ?>
                <p class="servicio capitalize"><?php echo $cita->servicio . ' $' . $cita->precio ?></p>
                <?php 
                    $actual = $cita->id;
                    $proximo = $citas[$key + 1]->id ?? null;
                    $total += $cita->precio;
                    
                    if($actual != $proximo):
                ?>
                    <p>Total: <span><?php echo '$' . $total ?></span></p>
                    <form method="POST" action="/api/eliminar">
                        <input type="hidden" name="id" value="<?php echo $cita->id ?>">
                        <input type="submit" value="Eliminar" class="boton-eliminar">
                    </form>
                <?php 
                    $total = 0;
                    endif; 
                ?>
        <?php
        endforeach;
        ?>
    </ul>
</div>
