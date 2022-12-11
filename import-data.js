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
        const locat = new Location({
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



function queryLocationById(id) {
    Location.findOne({sourceLocationId: id}).then(film => console.log(film+"\n"))
}
function queryAllByName(nomTournage) {
    Location.find({filmName : nomTournage}).then(film => console.log(film))
}
function queryIdandDelete(id){
    Location.findOneAndDelete({sourceLocationId : id}).then(film=>console.log("deleted filmLocation"))
}

function addALocation(newLoc){
    newLoc.save()
    console.log("New Location Added!")
}
async function main(){

    await mongoose.connect(process.env.MONGO_URI)
    //await loadFilmingLocations(Locations)
    //await queryLocationById('2020-412')
    //await queryAllByName("Une jeune fille qui va bien")
    //await queryIdandDelete('2020-412')

    const newLoc = new Location({
        "filmType":  "Horror",
        "filmProducerName" : "MOREAU Roch",
        "endDate" : "2020-01-01",
        "filmName" : "A day in a Web Class",
        "district" : "75001",
        "geolocation":{"coordinates": [2.348314535961912, 48.83566000015182], "type": "Point"},
        "sourceLocationId":'2020-05-07',
        "filmDirectorName":"ROCH Moreau",
        "adress": "Somewhere in Paris",
        "startDate":"2019-01-01",
        "year": parseInt("2015")

    })
    await addALocation(newLoc)
    console.log("Found Location")
}


main()
