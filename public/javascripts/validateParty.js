//Ayuda a crear las silabas
let partyName = document.querySelector('#nombre');
let partyAcronym = document.querySelector('#siglas');

partyName.addEventListener('input', function () {
    let acronym = partyName.value.split(' ').map(function (item) { return item[0] }).join('');
    if (acronym.length <= 5) partyAcronym.value = acronym.toUpperCase();
});



//Verificacion de limite de caracteres
let campoPropuesta = document.querySelectorAll('#propuesta');
//Agregamos el eventListene a todos los campos de propuestas.
campoPropuesta.forEach(propuesta => {
    propuesta.addEventListener('input', function () {
        updateLength(propuesta, 400);       //El número de caracteres máximo en DB para una propuesta es Varchar(400)
    });
});



//Tambien se le debe agregar al campo descripcion
let campoDescripcion = document.querySelector('#descripcion');
campoDescripcion.addEventListener('input', function () {
    console.log('Propuesta Updated')
    updateLength(campoDescripcion, 7999); //El número de caracteres máximo en DB para una descripcion es Varchar(7999)
});



//Funcion general para todos los campos
function updateLength(element, length) {
    let textLength = element.value.length;
    let textLeft = length - textLength;

    //Obtenemos el sibling de nuestro elemento (El cual siempre va a ser un class="form-text")
    let sibling = element.parentElement.lastElementChild;
    sibling.innerText = `${textLeft} caracteres restantes`;
    //Retornamos el texto restante, para proceder con la verificación de validez.
    isValid(element, textLeft, length);
}


let submitButton = document.querySelector('#formButton');

function isValid(element, textLeft, maxLength) {
    if (textLeft > 0 && textLeft < maxLength) {
        console.log(`TextLeft: ${textLeft}`)
        console.log(`MaxLength: ${maxLength}`)
        setValid(element);
    } else {
        setInvalid(element);
    }
}

function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
    submitButton.disabled = true;
}

function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
    submitButton.disabled = false
}