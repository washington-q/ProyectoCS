const cita = {
    nombreCliente: '',
    email: '',
    fecha: '',
    hora: '',
    servicios: [],
}

const $$navegacion = document.querySelectorAll('.tabs button');
const $$contenedores = document.querySelectorAll('div .seccion');

const tabs = () => {
    $$navegacion.forEach(boton => {
        boton.addEventListener('click', cambiarTab);
    });
}

const cambiarTab = e => {
    //Seleccionar la pestaña activa
    const $actual = document.querySelector('button.active');
    const tab = e.target;
    $actual.classList.remove('active');
    tab.classList.add('active');

    //llamar a ocultar botones paginador
    ocultarBotones(parseInt(tab.dataset.paso));

    //cambiar el contenedor de la seccion
    cambiarContenedor(tab);
}

const cambiarContenedor = pagina => {
    const $contenedor = document.querySelector(`#paso-${pagina.dataset.paso}`);
    $$contenedores.forEach(contenedor => {
        contenedor.classList.add('ocultar');
    });
    $contenedor.classList.remove('ocultar');
    if (pagina.dataset.paso == 3) {
        //mostrar resumen de la cita cuando la pagina sea la tercera
        mostrarResumen();
    }
}

const paginacion = () => {
    const $anterior = document.querySelector('#anterior');
    const $siguiente = document.querySelector('#siguiente');

    // $anterior.addEventListener('click', cambiarPagina);
    $siguiente.addEventListener('click', e => { cambiarPaginaSiguiente(e, 1) });
    $anterior.addEventListener('click', e => { cambiarPaginaSiguiente(e, -1) });
}

const ocultarBotones = (num) => {
    const $anterior = document.querySelector('#anterior');
    const $siguiente = document.querySelector('#siguiente');

    if (num === 2) {
        $anterior.classList.remove('ocultar');
        $siguiente.classList.remove('ocultar');
    } else if (num === 1) {
        $anterior.classList.add('ocultar');
        $siguiente.classList.remove('ocultar');
    } else if (num === 3) {
        $anterior.classList.remove('ocultar');
        $siguiente.classList.add('ocultar');
    }
}

const cambiarPaginaSiguiente = (e, num) => {
    //Seleccionar la pestaña activa
    const $actual = document.querySelector('button.active');
    const numPagina = parseInt($actual.dataset.paso);

    //oculatar los botones paginador
    ocultarBotones(numPagina + num);

    const $paginaSiguiente = document.querySelector(`[data-paso="${numPagina + num}"]`);
    $paginaSiguiente.classList.add('active');
    $actual.classList.remove('active');
    cambiarContenedor($paginaSiguiente);
}

//imprimir servicios en el html
const imprimirServicios = servicios => {
    servicios.forEach(servicio => {
        const { id, nombre, precio, descripcion } = servicio;

        //creando el html para el nombre del servicio
        const nombreServicio = document.createElement('p');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        //creando el html para el precio del servicio
        const precioServicio = document.createElement('p');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;

        //creando el html para la descripcion del servicio
        const descripcionServicio = document.createElement('p');
        descripcionServicio.classList.add('descripcion-servicio');
        descripcionServicio.textContent = descripcion;

        //creando el contenedor del servicio
        const servicioDiv = document.createElement('div');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;

        //agregando el html al contenedor del servicio
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        // servicioDiv.appendChild(descripcionServicio); 

        //agregando el contenedor del servicio al DOM
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

//funcion para seleccionar los servicios
const seleccionarServicio = () => {
    const $servicios = document.querySelectorAll('.servicio');
    $servicios.forEach(servicio => {
        servicio.addEventListener('click', () => {
            servicio.classList.toggle('active');

            const id = servicio.dataset.idServicio;
            const nombre = servicio.querySelector('.nombre-servicio').textContent;
            const precio = servicio.querySelector('.precio-servicio').textContent;
            //crear el objeto servicio
            const objServicio = { id, nombre, precio };

            //verificar si el servicio ya esta en el arreglo de servicios
            const existe = cita.servicios.find(servicio => servicio.id === id);
            if (!existe) {
                cita.servicios = [...cita.servicios, objServicio];
            };

            //verificar si el servicio se elimina del arreglo de servicios
            if (!servicio.classList.contains('active')) {
                cita.servicios = cita.servicios.filter(servicio => servicio.id !== id);
            }
        });
    });
}

//consultar los servicios de la api hecha en php
const consultarServicios = async () => {
    try {
        const response = await fetch('https://taller-autos-proyecto.herokuapp.com/api/servicios');
        const servicios = await response.json();
        imprimirServicios(servicios);
        seleccionarServicio();
    } catch (error) {
        console.log(error);
        mostrarAlerta('Error al consultar Servicios', 'error', '#paso-1', false);
    }
}

const mostrarAlerta = (mensaje, tipo, elemento, desaparece = true) => {
    //verificar si ya existe una alerta
    const $alertaPrevia = document.querySelector('.alerta');
    if ($alertaPrevia) {
        $alertaPrevia.remove();
    };

    //Generar el html de la alerta
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.classList.add('alerta');
    div.classList.add(tipo);
    p.textContent = mensaje;
    div.appendChild(p);
    const contenedorAlerta = document.querySelector(`${elemento}`);
    elemento === 'formulario' ? contenedorAlerta.before(div) : contenedorAlerta.appendChild(div);

    // Eliminar alerta despues de 3 segundos
    if (desaparece) {
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}

const agregarDatosUsuario = () => {
    const $nombre = document.querySelector('#nombre');
    const $email = document.querySelector('#email');
    const $fecha = document.querySelector('#fecha');
    const $hora = document.querySelector('#hora');

    $nombre.addEventListener('input', () => {
        cita.nombreCliente = $nombre.value;
    });
    $email.addEventListener('input', () => {
        cita.email = $email.value;
    });
    $fecha.addEventListener('input', (e) => {
        const fecha = new Date($fecha.value);
        if (fecha.getDay() === 6) {
            e.target.value = '';
            mostrarAlerta('domingo no es un día laboral', 'error', '.formulario');
        } else {
            cita.fecha = $fecha.value;
        };
    });
    $hora.addEventListener('input', () => {
        const horaCita = parseInt($hora.value.split(':')[0])
        cita.hora = $hora.value;
        if (horaCita <= 7 || horaCita >= 20) {
            mostrarAlerta('Hora no disponible', 'error', '.formulario');
            cita.hora = '';
        };
    });
}

//funcion para crear la cita
const reservarCita = async () => {

    const servicios = cita.servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('nombre', cita.nombreCliente);
    datos.append('email', cita.email);
    datos.append('fecha', cita.fecha);
    datos.append('hora', cita.hora);
    datos.append('servicios', servicios);

    // Peticion hacia la api
    const url = 'https://taller-autos-proyecto.herokuapp.com/api/citas';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const data = await response.json();
        if (data.error) {
            mostrarAlerta(data.error, 'error', '.contenido-resumen');
            return;
        }
        mostrarAlerta('Cita reservada Correctamente', 'exito', '.contenido-resumen');
    } catch (error) {
        mostrarAlerta('Error en el Servidor', 'error', '.contenido-resumen');
        console.log(error);
    }

}

const mostrarResumen = () => {
    const $resumen = document.querySelector('.contenido-resumen');
    const valoresCita = Object.values(cita);
    let flag = true;
    valoresCita.forEach(valor => {
        if (valor.length === 0) flag = false;
    });

    // Limpiar el contenido del resumen si estan todos los campos llenos
    while ($resumen.firstChild) {
        $resumen.removeChild($resumen.firstChild);
    }

    if (!flag) {
        mostrarAlerta('Por favor completa todos los campos', 'error', '.contenido-resumen', false);
        return;
    };

    //Titulo del resumen
    const tituloResumen = document.createElement('h2');
    tituloResumen.textContent = 'Resumen de la cita';
    $resumen.appendChild(tituloResumen);

    const { nombreCliente, email, fecha, hora, servicios } = cita;

    //crear el html del resumen
    const nombreUsuario = document.createElement('p');
    nombreUsuario.innerHTML = `<span>Nombre:</span> ${nombreCliente}`;
    $resumen.appendChild(nombreUsuario);

    const emailUsuario = document.createElement('p');
    emailUsuario.innerHTML = `<span>Email:</span> ${email}`;
    $resumen.appendChild(emailUsuario);

    const fechaUsuario = document.createElement('p');
    //formatear fecha
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate() + 2;
    const mes = fechaObj.getMonth();
    const year = fechaObj.getFullYear();
    const fechaFormateada = new Date(Date.UTC(year, mes, dia)).toLocaleDateString('es-EC', {
        weekday: 'long',
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    });
    fechaUsuario.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
    fechaUsuario.classList.add('fecha-resumen');
    $resumen.appendChild(fechaUsuario);

    const horaUsuario = document.createElement('p');
    horaUsuario.innerHTML = `<span>Hora:</span> ${hora}`;
    $resumen.appendChild(horaUsuario);

    const precio = document.createElement('p');
    let precioTotal = 0;
    servicios.forEach(servicio => {
        let { precio } = servicio;
        precio = precio.split(' ')[1];
        precioTotal += parseInt(precio);
    });
    precio.innerHTML = `<span>Precio:</span> $${precioTotal}`;
    precio.classList.add('precio-resumen');
    $resumen.appendChild(precio);

    const serviciosUsuario = document.createElement('p');
    serviciosUsuario.classList.add('servicios-resumen');
    serviciosUsuario.innerHTML = `<span>Servicios:</span> ${servicios.map(servicio => servicio.nombre).join(', ')}`;
    $resumen.appendChild(serviciosUsuario);

    //Boton para enviar la cita
    const botonEnviar = document.createElement('button');
    botonEnviar.classList.add('boton');
    botonEnviar.onclick = reservarCita;
    botonEnviar.textContent = 'Reservar Cita';
    $resumen.appendChild(botonEnviar);
}

const iniciarApp = () => {
    //cambiar cuando se presionen los tabs
    tabs();

    //cambiar contenedores con botones de paginacion
    paginacion();

    //consultar servicios de la api
    consultarServicios();

    //agregar los datos del usuario al objeto cita
    agregarDatosUsuario();
}

document.addEventListener('DOMContentLoaded', iniciarApp);
