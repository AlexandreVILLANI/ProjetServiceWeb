const avisService = require("../services/avis.services");


exports.getAllAvis = (req, res) => {
    let id = req.query.id
    avisService.getAllAvis(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createAvis = (req, res) => {
    let commentaire = req.body.commentaire
    let note = req.body.note
    let id_activite = req.body.id_activite
    let id_utilisateur = req.body.id_utilisateur
    avisService.createAvis(commentaire, note, id_activite, id_utilisateur,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateAvis = (req, res) => {
    let id_avis = req.body.id_avis;
    let commentaire = req.body.commentaire;
    let note = req.body.note;
    avisService.updateAvis(id_avis, commentaire, note,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
};

exports.deleteAvis = (req,res)=>{
    let id_avis = req.body.id_avis
    avisService.deleteAvis(id_avis,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


