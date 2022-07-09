<h1 class="nombre-pagina"><?php echo $title ?></h1>
<p class="descripcion-pagina">Inicia Sesión con tus datos</p>

<?php include __DIR__ . '/../templates/alertas.php' ?>

<form class="formulario" action="/login" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Tu Email" id="email" value="">
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Tu Password" id="password">
    </div>

    <input type="submit" class="boton" value="Iniciar Sesion" >
</form>

