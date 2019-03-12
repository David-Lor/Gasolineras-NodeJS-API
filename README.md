# GasolinerasNodeAPI

Backend para el proyecto Stack MEAN utilizando la [API de Gasolineras](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help) del Ministerio de Industria.

El backend genera otra API REST similar, que permite realizar consultas más concretas, almacenando los datos obtenidos en una base de datos MongoDB.

## Tecnologías

- NodeJS
- Express
- Mongoose

### Requisitos adicionales

**Base de datos MongoDB**. Todas las gasolineras obtenidas por la API (al arrancar el server) se guardan/actualizan en Mongo.

## Problema con la actualización de datos

La API de gasolineras oficial se consulta para actualizar la base de datos MongoDB cuando se arranca index.js. Esto tiene algunos problemas:

- Ralentiza algunas peticiones a nuestra API (aunque en principio no hay problema ya que la función de guardado/actualización de gasolineras es async)
- Sólo actualiza los datos de la BD cuando se inicia el servidor

Podría ser mejor crear otro script NodeJS que realice esta actualización, y automatizar mediante CRON u otra herramienta de gestión de tareas la actualización periódica. La API del Ministerio de Industria actualiza sus datos diariamente.

## Estructura documentos MongoDB

```js
{
    "_id" : "45",
    "ubicacion" : [ 
        43.031889, 
        -2.967611
    ],
    "carburantes" : [ 
        {
            "carburante" : "Gasóleo A",
            "precio" : 1.279
        },
        {
            "carburante" : "Gasolina 95",
            "precio" : 1.309
        }, 
        {
            "carburante" : "Gasolina 98",
            "precio" : 1.424
        }, 
        {
            "carburante" : "Nuevo Gasóleo A",
            "precio" : 1.339
        }
    ],
    "codPostal" : "01450",
    "direccion" : "CARRETERA A-624 KM. 37,8",
    "horario" : "L-D: 06:00-22:00",
    "localidad" : "LEZAMA",
    "margen" : "D",
    "municipio" : "Amurrio",
    "provincia" : "ÁLAVA",
    "marca" : "CEPSA",
    "datetime" : ISODate("2019-03-10T11:49:38.188Z"),
    "__v" : 0
}
```
