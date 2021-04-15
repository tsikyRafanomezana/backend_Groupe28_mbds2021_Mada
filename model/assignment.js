let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");


let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    etudiant: { type: Schema.Types.ObjectId, ref: 'Etudiant' },
    matiere: { type: Schema.Types.ObjectId, ref: 'Matiere' },   
    prof: { type: Schema.Types.ObjectId, ref: 'Prof' },
    note: Number,
    remarque:String
});

AssignmentSchema.plugin(aggregatePaginate); 


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
