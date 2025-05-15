const usersService = require("../services/users.service");
const crypto = require("crypto");

exports.getUsers = (req, res) => {
    usersService.getAllUsers((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getUserById = (req, res) => {
    let id = req.query.id
    usersService.getUserById(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getActivitesByPrestataire = (req, res) => {
    let id = req.query.id
    usersService.getActivitesByPrestataire(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createUser = (req, res) => {
    let nom = req.body.nom
    let prenom = req.body.prenom
    let mdp = req.body.password
    let mail = req.body.mail
    let point = req.body.point
    let id_role = req.body.id_role
    const passwordHash = crypto.createHash("sha256").update(mdp).digest("hex");
    usersService.createUser(nom,prenom,mail,passwordHash,point,id_role,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.createPrestataire = (req, res) => {
    let nom_societe = req.body.nom_societe
    let id_utilisateur = req.body.id_utilisateur

    usersService.createPrestataire(nom_societe,id_utilisateur,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateUtilisateur = (req, res) => {
    let nom = req.body.nom
    let prenom = req.body.prenom
    let adresse_mail = req.body.mail
    let password = req.body.password
    let id_utilisateur = req.body.id
    let point = req.body.point
    console.log(point)
    let passwordHash = password ? crypto.createHash("sha256").update(password).digest("hex") : null;
    usersService.updateUtilisateur(nom,prenom,adresse_mail,passwordHash,point,id_utilisateur,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updatePrestataire = (req, res) => {
    let nom_societe = req.body.nom_societe
    let id_prestataire = req.body.id_prestataire
    usersService.updatePrestataire(id_prestataire,nom_societe,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteUtilisateur = (req, res) => {
    let id = req.body.id

    usersService.deleteUtilisateur(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.deletePrestataire= (req, res) => {
    let id = req.body.id

    usersService.deletePrestataire(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}



exports.getAllReservations = (req, res) => {
    let id = req.query.id
    usersService.getAllReservations(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getUserBySessionId = (req, res) => {
    const session_id = req.cookies.session
    usersService.getUserBySessionId(session_id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.getPrestataireByUserId = (req, res) => {
    const id = req.query.id
    usersService.getPrestataireByUserId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.getAllPrestataires = (req, res) => {
    usersService.getAllPrestataires((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        } else {
            return res.status(200).send(data);
        }
    });
}

exports.updateVueActivite = (req, res) => {
    let id_activite = req.body.id_activite;
    if (!id_activite) {
        return res.status(400).send("L'id_activite est requis");
    }
    usersService.updateVueActivite(id_activite, (error, data) => {
        if (error) {
            console.error("Erreur lors de la mise à jour de la vue :", error);
            return res.status(500).send("Erreur interne du serveur");
        } else {
            return res.status(200).json(data);
        }
    });
}

exports.getVueActiviteById = (req, res) => {
    let id = req.query.id_activite || req.query.id; // Accepte les deux formats
    usersService.getVueActiviteById(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}





