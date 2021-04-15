let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let EtudiantSchema = Schema({
    id: Number,
    nomEtudiant: String,
    prenom: String
});

EtudiantSchema.plugin(aggregatePaginate); 

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Etudiant', EtudiantSchema);