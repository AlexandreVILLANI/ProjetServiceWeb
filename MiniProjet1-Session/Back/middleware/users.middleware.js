const validator = require("validator");

exports.validateUserCreation = (req,res,next) => {
    let nom = req.body.nom;
    let prenom = req.body.prenom;

    if (!nom || !prenom){
        return res.status(400).send('Nom ou prenom sont nulles!');
    }
    prenom = prenom.toString();
    nom = nom.toString();
    if (!validator.isLength(nom,{min:3}) || !validator.isAlpha(nom,'en-US',{ignore:' '})){
        return res.status(400).send('Format incorrect pour nom');
    }
    if (!validator.isLength(prenom,{min:3}) || !validator.isAlpha(prenom,'en-US',{ignore:' '})){
        return res.status(400).send('Format incorrect pour prenom');
    }
    let password = req.body.mdp;

    if (!validator.isLength(password, {min: 7})){
        return res.status(400).send("Format incorrect : le mot de passe doit contenir au moins 8 caractères");
    }
    next();
}
