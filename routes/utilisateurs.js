let Utilisateur = require("../model/utilisateur");

function testerLogin(req, res) {
    console.log( req.params );
    let pseudo=req.body.pseudo;
    //let mdp=sha1( req.body.mdp );
    let mdp = req.body.mdp;
    console.log( pseudo + " --" + mdp);
    Utilisateur.findOne(
      { pseudo: pseudo , mdp : mdp }
      , (err, utilisateur) => {
        if (err) {
          res.send(err);
        }
        res.json(utilisateur);
      }
    );
}

module.exports = {
  testerLogin,
};