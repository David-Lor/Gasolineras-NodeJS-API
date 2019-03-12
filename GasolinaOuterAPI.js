/*
    Contacto con la API del Ministerio de Industria
 */

//let schedule = require('node-schedule'); // https://www.npmjs.com/package/node-schedule
// https://www.npmjs.com/package/xml2json
// https://www.npmjs.com/package/xml2js

const request = require('request');

//ENDPOINTS
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help

const API = {
    GET_ALL: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/',
    GET_BY_CA: 'EstacionesTerrestres/FiltroCCAA/{IDCCAA}',
    GET_BY_GAS_CA: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAAProducto/{IDCCAA}/{IDPRODUCTO}',
    GET_BY_MUNICIPIO: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/{IDMUNICIPIO}',
    GET_BY_GAS_MUNICIPIO: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/{IDMUNICIPIO}/{IDPRODUCTO}',
    GET_BY_GAS: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProducto/{IDPRODUCTO}',
    GET_BY_PROV: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/{IDPROVINCIA}',
    GET_BY_GAS_PROV: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvinciaProducto/{IDPROVINCIA}/{IDPRODUCTO}',
    CCAA: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/',
    GASOLINAS: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/',
    MUNICIPIOS: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help/operations/Municipios',
    MUNICIPIOS_PROV: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/{IDPROVINCIA}',
    PROVINCIAS: 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/',
    PROVINCIAS_CA: ' https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/{IDCCAA}',
};

/*function getAllGasolineras() {
    return https.get(API.GET_ALL,
        (resp) => {
            let data = '';
            //Recibir lo que va devolviendo la API
            resp.on('data', (chunk) => {
                data += chunk;
                console.log("Chunk:", chunk);
            });
            //Respuesta recibida al completo
            resp.on('end', () => {
                console.log("Data:", data);
                let js = JSON.parse(data);
                let gasolineras = js['ListaEESSPrecio'];
                console.log("(API) Obtenidas " + gasolineras.length + " gasolineras");
                return gasolineras;
            });
        }
    ).on('error', (err) => {
        console.error("Error: " + err.message);
        return [];
    });
}*/

/*function getAllGasolineras() {
    return request(
        API.GET_ALL,
        {json:true},
        (err, res, body) => {
            if (err || res.statusCode !== 200) {
                console.error(err);
            } else { //body = json (object)
                let gasolineras = body['ListaEESSPrecio']; //Array de diccionarios, cada dict es una gasolinera
                console.log("(API) Obtenidas " + gasolineras.length + " gasolineras");

            }
        }
    );
}*/

function getAllGasolineras(callback) {
    request(
        API.GET_ALL,
        {json:true},
        (err, res, body) => {
            if (err) {
                console.error(err);
            } else if (res.statusCode !== 200) {
                console.error("Status Code = " + res.statusCode);
            } else { //body = json (object)
                let gasolineras = body['ListaEESSPrecio']; //Array de diccionarios, cada dict es una gasolinera
                console.log("(API) Obtenidas " + gasolineras.length + " gasolineras");
                callback(gasolineras);
            }
        }
    );
}

module.exports = {
    'getAllGasolineras': getAllGasolineras,
};
