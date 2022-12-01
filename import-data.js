const filmingLocations = require('./lieux-de-tournage-a-paris.json')
const mongoose = require('mongoose')
const {mquery} = require("mongoose");
const { Schema } = mongoose;
require('dotenv').config()
const locationSchema = new Schema({
    "filmType": String,
    "filmProducerName": String,
    "endDate": Date,
    "filmName": String,
    "district": String,
    "geolocation": {
        "coordinates": {
           type: [Number]
        },
        "type": {
            type:String,
            enum:['Point'],
        }
    },
    "sourceLocationId": String,
    "filmDirectorName": String,
    "address": String,
    "startDate": Date,
    "year": Number,
});





const Location = mongoose.model('Location',locationSchema);

function loadFilmingLocations(Locations){
    const filmingLocations = require('./lieux-de-tournage-a-paris.json')

    for(const element of filmingLocations){
        const locat = new Locations({
            "filmType":  element.fields.type_tournage,
            "filmProducerName" : element.fields.nom_producteur,
            "endDate" : new Date(element.fields.date_fin),
            "filmName" : element.fields.nom_tournage,
            "district" : element.fields.ardt_lieu,
            "geolocation":element.fields.geo_shape,
            "sourceLocationId":element.fields.id_lieu,
            "filmDirectorName":element.fields.nom_realisateur,
            "adress": element.fields.adresse_lieu,
            "startDate":new Date(element.fields.date_debut),
            "year": parseInt(element.fields.annee_tournage)

        })

        locat.save();
    }
}

function findOneById(Locations, locationId){
    const filmingLocations = require('./lieux-de-tournage-a-paris.json')

    Location.findOne({sourcelLocationId : locationId})
}

function queryLocationById(idInMongo) {
    Location.findOne({sourceLocationId: idInMongo}).then(film => console.log(film+"\n"))
}
function queryAll() {
    Location.find({}).then(film => console.log(film))
}
async function main(){

    await mongoose.connect(process.env.MONGO_URI)
    //await loadFilmingLocations(Locations)
    //await queryLocationById('2020-412')
    await queryAll()
    console.log("Found Location")
}


main()
