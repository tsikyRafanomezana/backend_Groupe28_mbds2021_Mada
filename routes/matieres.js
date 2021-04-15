// Assignment est le "modèle mongoose", il est connecté à la base de données
let Matiere = require("../model/matiere");

/* Version sans pagination */
// Récupérer tous les matières (GET)

function getMatiere(req, res){
    Matiere.find((err, matiere) => {
        if(err){
            res.send(err)
        }

        res.send(matiere);
    });
}


// // Récupérer tous les assignments (GET), AVEC PAGINATION
function getMatierePagine(req, res) {
  var aggregateQuery = Matiere.aggregate();
  
  Matiere.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, matiere) => {
      if (err) {
        res.send(err);
      }
      res.send(matiere);
    }
  );
}

// Ajout d'une matière (POST)
function postMatiere(req, res) {
  let matiere = new Matiere();
  matiere.id = req.body.id;
  matiere.nom = req.body.nom;
  matiere.imageMatiere = req.body.imageMatiere;
  //assignment.rendu = req.body.rendu;

  console.log("POST matiere reçu :");
  console.log(matiere);

  assignment.save((err) => {
    if (err) {
      res.send("cant post matiere ", err);
    }
    res.json({ message: `${matiere.nom} saved!` });
  });
}

module.exports = {
    getMatiere,
    postMatiere,
    getMatierePagine,
  };