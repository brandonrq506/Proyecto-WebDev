function validateCredentials() {

    let correo = document.getElementById("correoEstudiantil").value;
    let password = document.getElementById("contrasena").value;
    let correoValido = false;
    let contrasenaValida = false;

    let resolution = "";

    /*validación de correo*/

    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    let esValido = re.test(correo);
    if (esValido == true) {
        correoValido = true;
    }
    else {
        alert('El correo que ha ingresado no es valido.');
        return false;
    }

    /*Validación de contraseña*/

    if (password.length == 0 || password.length < 8) {
        alert('Por favor ingrese una contraseña valida.');
        return false;
    }
    else {
        contrasenaValida = true;
    }

    /*Confirmación de que ambos valores son validos*/

    return correoValido == true && contrasenaValida == true;

}