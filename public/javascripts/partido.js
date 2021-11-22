//Funcionalidad para ejecutar el btn de buscar
const btnBuscar = document.querySelector('button');
const inputBox = document.querySelector('input');

btnBuscar.addEventListener('click', () => {
    let upperLimit = window.location.href.lastIndexOf('/');
    let rootLink = window.location.href.substring(0, upperLimit);
    let path = '/' + inputBox.value;
    window.location.href = rootLink + path;
})