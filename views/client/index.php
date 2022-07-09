

<!-- <div class="contenedor-titulo"> -->
    <div class="contenedor-titulo">
        <a class="enlace-admin" href="/login">
            <i class="fas fa-user"></i>
        </a>
        <h1>Crear Nueva Cita</h1>
        <p class="descripcion-pagina">Elige tus servicios a continuacion</p>
    </div>
<!-- </div> -->


<?php include __DIR__ . '/../templates/alertas.php' ?>

<div id="app">
    <nav class="tabs">
        <button class="active" type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Informacion Cita</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>
      
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="descripcion-pagina">Elige tus servicios a continuacion</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>    

    <div id="paso-2" class="seccion ocultar">
        <h2>Tus Datos y Cita</h2>
        <p class="descripcion-pagina">Coloca tus datos y fecha de tu cita</p>

        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu Nombre">
            </div>

            <div class="campo">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Tu Email">
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" min="<?php echo date('Y-m-d', strtotime('+1 day')) ?>">
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora">
            </div>
        </form>
    </div>

    <div id="paso-3" class="seccion ocultar contenido-resumen">
        <h2>Resumen</h2>
        <p class="descripcion-pagina">Verifica que la informacion sea correcta</p>
    </div>

    <div class="paginacion">
        <button
            id="anterior"
            class="boton ocultar"
        >&laquo; Anterior</button>

        <button
            id="siguiente"
            class="boton"
        >Siguiente &raquo;</button>
    </div>
</div>