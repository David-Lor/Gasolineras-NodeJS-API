/*
    Control de acceso a datos MongoDB
 */

const {Gasolinera, GasolineraModel} = require('./GasolineraModel');

//función Async para que no bloquee las peticiones a nuestra API mientras se actualizan las gasolineras
async function saveGasolineras(mongoConnection, gasolineras) {
    console.log("Guardando " + gasolineras.length + " gasolineras...");

    for (let i in gasolineras) {
        // noinspection JSUnfilteredForInLoop
        let gasJs = gasolineras[i];
        // console.log("JSON de Gasolinera:\n" + JSON.stringify(gasJs));

        let gasolinera = new Gasolinera(gasJs);
        let gasolineraModel = gasolinera.toModel();

        await gasolineraModel.save().then(
            () => {
                console.log("Insertada gasolinera #" + gasolinera.id);
            },
            (error) => {
                if (typeof error.message === "string" && error.message.indexOf("duplicate key error") !== -1) {
                    //Clave duplicada, actualizar documento
                    GasolineraModel.findOneAndUpdate({_id: gasolinera.id}, gasolineraModel).then(
                        () => {
                            console.log("Actualizada gasolinera #" + gasolinera.id);
                        },
                        (error2) => {
                            console.error("Error actualizando gasolinera #" + gasolinera.id + ":\n" + error2.message);
                        }
                    );
                } else {
                    console.error("Error insertando gasolinera #" + gasolinera.id + ":\n" + error.message);
                }
            }
        );
    }
}

module.exports = {
    'saveGasolineras': saveGasolineras,
};
