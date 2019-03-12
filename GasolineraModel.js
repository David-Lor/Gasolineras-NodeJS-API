/*
    Modelos de datos MongoDB
 */

const mongo = require('mongoose');

const CarburanteSchema = mongo.Schema({
    carburante: String,
    precio: Number,
}, {_id : false});

const GasolineraSchema = mongo.Schema({
    _id: String,
    codPostal: String,
    direccion: String,
    horario: String,
    ubicacion: [Number],
    localidad: String,
    margen: String,
    municipio: String,
    provincia: String,
    marca: String,
    datetime: Date,
    carburantes: [CarburanteSchema],
});

const UpdatedSchema = mongo.Schema({
    _id: String,
    datetime: Date,
    gasolineras: Number
});

const GasolineraModel = mongo.model('Gasolinera', GasolineraSchema);
const CarburanteModel = mongo.model('Carburante', CarburanteSchema);
const UpdatedModel = mongo.model('Updated', UpdatedSchema);

class Gasolinera {
    //Constructor a partir del JSON devuelto por la API
    constructor(js) {
        // this.js = js;

        // "IDEESS": "762",
        this._id = js['IDEESS'];
        this.id = this._id;

        // "C.P.": "36202",
        this.codPostal = js['C.P.'];

        // "Dirección": "AVENIDA BEIRAMAR, 53",
        // noinspection JSNonASCIINames
        this.direccion = js['Dirección'];

        // "Horario": "L-D: 24H",
        this.horario = js['Horario'];

        // "Latitud": "42,233611",
        // "Longitud (WGS84)": "-8,733278",
        try {
            this.ubicacion = [
                parseFloat(js['Latitud'].replace(',', '.')),
                parseFloat(js['Longitud (WGS84)'].replace(',', '.'))
            ];
        } catch (e) {
            this.ubicacion = -1.0;
        }

        // "Localidad": "VIGO",
        this.localidad = js['Localidad'];

        // "Margen": "D",
        this.margen = js['Margen']; //derecha-izquierda

        // "Municipio": "Vigo",
        this.municipio = js['Municipio'];

        // "Provincia": "PONTEVEDRA",
        this.provincia = js['Provincia'];

        // "Remisión": "dm", ¿¿??

        // "Rótulo": "REPSOL",
        // noinspection JSNonASCIINames
        this.marca = js['Rótulo'];

        // "Tipo Venta": "P",

        // "% BioEtanol": "0,0",
        // "% Éster metílico": "0,0",

        // "IDMunicipio": "5324",
        // "IDProvincia": "36",
        // "IDCCAA": "12"

        // "Precio Biodiesel": "None",
        // "Precio Bioetanol": "None",
        // "Precio Gas Natural Comprimido": "None",
        // "Precio Gas Natural Licuado": "None",
        // "Precio Gases licuados del petróleo": "None",
        // "Precio Gasoleo A": "1,268",
        // "Precio Gasoleo B": "None",
        // "Precio Gasolina 95 Protección": "1,288",
        // "Precio Gasolina  98": "1,428",
        // "Precio Nuevo Gasoleo A": "1,318",

        // noinspection JSNonASCIINames, NonAsciiCharacters
        this.carburantes = {
            'Biodiesel': js['Precio Biodiesel'],
            'Bioetanol': js['Precio Bioetanol'],
            'Gas Natural Comprimido': js['Precio Gas Natural Comprimido'],
            'Gas Natural Licuado': js['Precio Gas Natural Licuado'],
            'Gases Licuados del Petróleo': js['Precio Gases licuados del petróleo'],
            'Gasóleo A': js['Precio Gasoleo A'],
            'Gasóleo B': js['Precio Gasoleo B'],
            'Gasolina 95': js['Precio Gasolina 95 Protección'],
            'Gasolina 98': js['Precio Gasolina  98'],
            'Nuevo Gasóleo A': js['Precio Nuevo Gasoleo A']
        };
        for (let key in this.carburantes) {
            // noinspection JSUnfilteredForInLoop
            let value = this.carburantes[key];
            let newValue;
            if (typeof value === 'string') {
                newValue = parseFloat(value.replace(',', '.'))
            } else {
                newValue = -1.0;
            }
            // noinspection JSUnfilteredForInLoop
            this.carburantes[key] = newValue;
        }
    }

    toModel() {
        let gasolineraModel = new GasolineraModel();
        gasolineraModel._id = this._id;
        gasolineraModel.codPostal = this.codPostal;
        gasolineraModel.direccion = this.direccion;
        gasolineraModel.horario = this.horario;
        gasolineraModel.ubicacion = this.ubicacion;
        gasolineraModel.localidad = this.localidad;
        gasolineraModel.margen = this.margen;
        gasolineraModel.municipio = this.municipio;
        gasolineraModel.provincia = this.provincia;
        gasolineraModel.marca = this.marca;
        gasolineraModel.datetime = new Date();
        gasolineraModel.carburantes = [];
        for (let key in this.carburantes) {
            // noinspection JSUnfilteredForInLoop
            let precio = this.carburantes[key];
            if (precio !== -1) {
                let carburanteModel = new CarburanteModel();
                carburanteModel.carburante = key;
                carburanteModel.precio = precio;
                gasolineraModel.carburantes.push(carburanteModel);
            }
        }
        return gasolineraModel;
    }
}

module.exports = {
    Gasolinera,
    GasolineraModel,
    CarburanteModel,
    UpdatedModel
};
