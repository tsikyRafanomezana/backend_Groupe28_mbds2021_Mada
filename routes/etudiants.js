let Matiere = require("../model/etudiant");
function getEtudiant(req, res){
    Matiere.find((err, etudiant) => {
        if(err){
            res.send(err)
        }

        res.send(etudiant);
    });
}

module.exports = {
    getEtudiant,
  };