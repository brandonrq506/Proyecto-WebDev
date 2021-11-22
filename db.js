//Objecto Connection
let Connection = require('tedious').Connection;

//Objeto JSON 
let config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'brandon',
            password: 'ram123'
        }
    },
    options: {
        port: 1434,
        database: 'Testing',
        rowCollectionOnRequestCompletion: true
    }
}

let connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully Connected to DataBase');
    }
});

connection.connect();

module.exports = { connection };