// Assignment est le "modèle mongoose", il est connecté à la base de données
let Assignment = require("../model/assignment");
const Prof = require("../model/prof");
const Etudiant = require("../model/etudiant");

/* Version sans pagination */
// Récupérer tous les assignments (GET)
/*
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/

// Récupérer tous les assignments (GET), AVEC PAGINATION
/*function getAssignments(req, res) {
  var aggregateQuery = Assignment.aggregate();
  
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}*/

function getAssignments(req,res){
  var aggregateQuery = Assignment.aggregate([
      { "$lookup": {
        "from": "etudiants",
        "localField": "etudiant",
        "foreignField": "_id",
        "as": "etudiant"
    }},
    { "$lookup": {
        "from": "matieres",
        "localField": "matiere",
        "foreignField": "_id",
        "as": "matiere"
    }},
    { "$lookup": {
      "from": "profs",
      "localField": "prof",
      "foreignField": "_id",
      "as": "prof"
    }},
  ]);
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;

  Assignment.findOne({_id: assignmentId }).populate('etudiant').populate('matiere').populate('prof').exec(function (err, assignment) {
    if (err) {
        console.log(err)
    }
    return res.json(assignment);
  });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;
  assignment.etudiant = req.body.etudiant;
  assignment.matiere = req.body.matiere;
  assignment.prof = req.body.prof;
  assignment.note = req.body.note;
  assignment.remarque = req.body.remarque;

  console.log("POST assignment reçu :");
  console.log(assignment);

  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

function getAssignmentRendu(req,res){
  var aggregateQuery = Assignment.aggregate([
    { "$lookup": {
      "from": "etudiants",
      "localField": "etudiant",
      "foreignField": "_id",
      "as": "etudiant"
  }},
  { "$lookup": {
      "from": "matieres",
      "localField": "matiere",
      "foreignField": "_id",
      "as": "matiere"
  }},
  { "$lookup": {
    "from": "profs",
    "localField": "prof",
    "foreignField": "_id",
    "as": "prof"
  }},
  { $match: { rendu: true } },
]);
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

function getAssignmentNonRendu(req,res){
  var aggregateQuery = Assignment.aggregate();
  var aggregateQuery = Assignment.aggregate([
    { "$lookup": {
      "from": "etudiants",
      "localField": "etudiant",
      "foreignField": "_id",
      "as": "etudiant"
  }},
  { "$lookup": {
      "from": "matieres",
      "localField": "matiere",
      "foreignField": "_id",
      "as": "matiere"
  }},
  { "$lookup": {
    "from": "profs",
    "localField": "prof",
    "foreignField": "_id",
    "as": "prof"
  }},
  { $match: { rendu: false } },
]);
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentRendu,
  getAssignmentNonRendu,
};
