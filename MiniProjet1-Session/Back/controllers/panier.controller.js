const panierService = require("../services/panier.services");


exports.addToPanierActivite = (req, res) => {
    let id_utilisateur = req.body.id_utilisateur
    let id_creneau = req.body.id_creneau
    let nombre_articles = req.body.nombre_articles
    let prix = req.body.prix
    panierService.addToPanierActivite(id_utilisateur,id_creneau,nombre_articles,prix,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.getPanierActivite = (req, res) => {
    let id_utilisateur = req.query.id
    panierService.getPanierActivite(id_utilisateur,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.deletePanierActivite = (req, res) => {
    let id = req.query.id
    console.log(id)
    panierService.deletePanierActivite(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.addToPanierArticle = (req, res) => {
    let id_utilisateur = req.body.id_utilisateur
    let id_article = req.body.id_article
    let nombre_articles = req.body.nombre_articles
    let prix = req.body.prix
    let payment = req.body.payment
    panierService.addToPanierArticle(id_utilisateur,id_article,nombre_articles,prix,payment,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.getPanierArticle = (req, res) => {
    let id_utilisateur = req.query.id
    panierService.getPanierArticle(id_utilisateur,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.deletePanierArticle = (req, res) => {
    let id = req.query.id
    panierService.deletePanierArticle(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.createAchat = (req, res) => {
    let id_utilisateur = req.body.id_utilisateur
    let id_article = req.body.id_article
    let nombre_articles = req.body.nombre_articles
    let nom_article = req.body.nom_article
    panierService.createAchat(id_utilisateur,id_article,nombre_articles,nom_article,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}



exports.getAchats = (req, res) => {
    let id_utilisateur = req.query.id
    panierService.getAchats(id_utilisateur,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


