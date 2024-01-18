var mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'etabibo',
    dateStrings: 'date'
});

/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'etabibo_new',
    password: 'Sastanaqqam123',
    database: 'etabibo_etabibo',
    dateStrings: 'date'
});
*/



connection.connect(function (err) {

    if (err) throw err;

    console.log("connection database done");

});



module.exports = connection;