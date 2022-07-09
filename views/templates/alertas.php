<?php 
foreach($alertas as $key => $mensajes): 
    foreach($mensajes as $mensaje): ?>        
        <div class="alerta <?php echo $key ?>">
            <p><?php echo s($mensaje) ?></p>
        </div>
    <?php endforeach;
endforeach; ?>

