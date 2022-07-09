
const iniciarApp = () => {
    buscarPorFecha();
}

const buscarPorFecha = () => {
    const $fechaInput = document.querySelector('#fecha');
    $fechaInput.addEventListener('change', e => {
        const fechaSleccionada = e.target.value;
        window.location = `?fecha=${fechaSleccionada}`;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});



