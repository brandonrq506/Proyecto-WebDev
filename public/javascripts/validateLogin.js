//Declare variables to be used
const correo = document.querySelector('#correo');
const contra = document.querySelector('#contra');
const button = document.querySelector('#btnSubmit');

//Manuel REGEX for valid emails
let REGEX = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;


//==== Listamos nuestros eventlisteners ====
correo.addEventListener('input', () => {
    //DB maximum allowed lenght is varchar(40)
    if (correo.value.length > 40) {
        invalidTag(correo, 'Accede la longitud maxima');
    } else if (REGEX.test(correo.value)) {
        validTag(correo, 'Correo valido');
    } else {
        invalidTag(correo, 'No cumple el formato indicado');
    }
});

contra.addEventListener('input', () => {
    //This is definitely not a valid password
    if (contra.value.length == 0) {
        invalidTag(contra, 'Espacio Vacio');
        //DB minimum required length is varchar(8)
    } else if (contra.value.length < 8) {
        invalidTag(contra, 'Contraseña debe ser mayor a 8 caracteres');
        //DB maximum allowed length is varchar(20)
    } else if (contra.value.length > 20) {
        invalidTag(contra, 'Contraseña debe ser menor a 20 caracteres');
    } else {
        validTag(contra, 'Contraseña valida');
    }
});

button.addEventListener('onclick', () => {
    console.log('Clicked')
});

//=== Methodos encargados de mostrar validez ===
function validTag(element, message) {
    //Format our valid message
    let div = document.createElement('div');
    div.classList.add('valid-feedback');
    div.innerText = message;

    //Format the element itself
    let parentElem = element.parentElement;
    element.classList.add('is-valid');

    //Eliminate posible duplicates
    parentElem.removeChild(parentElem.lastChild);

    parentElem.append(div);

}

function invalidTag(element, message) {
    let div = document.createElement('div');
    div.classList.add('invalid-feedback');
    div.setAttribute('id', `invalid${element.innerText}`);
    div.innerText = message;

    let parentElem = element.parentElement;
    element.classList.add('is-invalid');

    parentElem.removeChild(parentElem.lastChild);
    parentElem.append(div);
}