
//Ayuda a crear las silabas
let partyName = document.querySelector('#nombre');
let partyAcronym = document.querySelector('#siglas');

partyName.addEventListener('input', function () {
    let acronym = partyName.value.split(' ').map(function(item){return item[0]}).join('');
    if (acronym.length <= 5) partyAcronym.value = acronym.toUpperCase();
});
