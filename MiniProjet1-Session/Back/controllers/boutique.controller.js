const boutiqueService = require("../services/boutique.service");

exports.getAllArticle = (req, res) => {
    boutiqueService.getAllArticle((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getArticleById = (req, res) => {
    let id = req.query.id
    boutiqueService.getArticleById(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {

            return res.status(200).send(data);
        }
    })
}