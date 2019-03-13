const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const GasolinaOuterAPI = require('./GasolinaOuterAPI');
const GasolinaInnerAPI = require('./GasolinaInnerAPI');
const GasolineraController = require('./GasolineraController');

const API_PORT = 7878;
const MONGO_HOST = "192.168.0.99";
const MONGO_PORT = 27017;

//Webserver
let app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Conexión MongoDB
mongo.connect('mongodb://' + MONGO_HOST + ':' + MONGO_PORT + '/claseInterfaces', {useNewUrlParser: true}).then(
    () => { //Conexión OK -> conectar MongoDB
        console.log("MongoDB conectada");
        app.listen(API_PORT, () => {
            console.log('Servidor ONLINE!');

            GasolinaOuterAPI.getAllGasolineras(function(gasolineras) {
                console.log("(index) Obtenidas " + gasolineras.length + " gasolineras");
                GasolineraController.saveGasolineras(mongo.connection, gasolineras);
            });
        });
    },
    error => { //Error
        console.error("Error conectando MongoDB:\n" + error);
    }
);

// Middleware
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY,Origin,X-Requested-With,Content-Type,Accept, Access-Control-Request-Method' );
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Allow', 'GET');
    next();
});


//Endpoints API

// noinspection JSUnresolvedFunction
app.get('/codpostal/:codpostal', GasolinaInnerAPI.getByCodPostal);
// noinspection JSUnresolvedFunction
app.get('/id/:id', GasolinaInnerAPI.getByID);
// noinspection JSUnresolvedFunction
app.get('/cod/:id', GasolinaInnerAPI.getByID);
