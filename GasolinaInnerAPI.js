/*
    Funciones Endpoint de nuestra API.
    Por la naturaleza de la API, sólo disponemos de endpoints GET.
 */

const {Gasolinera, GasolineraModel} = require('./GasolineraModel');

function getByID(req, res) {
    // noinspection JSUnresolvedVariable
    let id = req.params.id;
    GasolineraModel.findById(id).then(
        gasolinera => {
            if (gasolinera) {
                res.status(200).send(gasolinera);
            } else {
                res.status(404).send("Gasolinera no encontrada");
            }
        }
    ).catch(
        () => {
            res.status(500).send("Error interno");
        }
    );
}

function getByCodPostal(req, res) {
    // noinspection JSUnresolvedVariable
    let codPostal = req.params.codpostal;
    GasolineraModel.find({codPostal: codPostal}).then(
        gasolinera => {
            //Devuelve array de gasolineras (vacío si no hay resultados)
            res.status(200).send(gasolinera);
        }
    ).catch(
        () => {
            res.status(500).send("Error interno");
        }
    );
}
module.exports = {
    getByCodPostal,
    getByID,
};
