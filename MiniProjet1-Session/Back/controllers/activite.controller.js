const activiteService = require("../services/activite.service");

exports.getAllActiviteByType = (req, res) => {
    let type = req.query.type
    activiteService.getAllActiviteByType(type,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getActiviteById = (req, res) => {
    let id = req.query.id
    activiteService.getActiviteById(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getMoyenneNote = (req, res) => {
    activiteService.getMoyenneNote((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.updateNbPlaces = (req, res) => {
    let id = req.body.id
    let nb = req.body.nb
    activiteService.updateNbPlaces(id,nb,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateActivite = (req, res) => {
    let id = req.body.id_activite
    let nom = req.body.nom_activite
    let prix = req.body.prix_activite
    let description = req.body.description_activite
    activiteService.updateActivite(id,nom,prix,description,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateCreneau = (req, res) => {
    let id = req.body.id_creneau
    let date = req.body.date_activite
    let heure_debut = req.body.heure_debut
    let heure_fin = req.body.heure_fin
    let places = req.body.places_disponibles
    activiteService.updateCreneau(id,date,heure_debut,heure_fin,places,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createReservation = (req, res) => {
    let id_utilisateur = req.body.id_utilisateur
    let id_creneau = req.body.id_creneau
    let nb = req.body.nb
    activiteService.createReservation(id_utilisateur,id_creneau,nb,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}


exports.createActivite = (req, res) => {
    let id = req.body.id_prestataire
    let nom = req.body.nom_activite
    let type = req.body.type_activite
    let image = req.body.image_activite
    let prix = req.body.prix_activite
    let description = req.body.description_activite
    activiteService.createActivite(id,nom,type,image,prix,description,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteActivite = (req, res) => {
    let id = req.body.id
    activiteService.deleteActivite(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteCreneau = (req, res) => {
    let id = req.body.id
    activiteService.deleteCreneau(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.deleteReservation = (req, res) => {
    let id = req.body.id
    activiteService.deleteReservation(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createCreneau = (req, res) => {
    let id = req.body.id_activite
    let date = req.body.date_activite
    let debut = req.body.heure_debut
    let fin = req.body.heure_fin
    let places = req.body.places_disponibles

    activiteService.creerCreneau(id,date,debut,fin,places,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}
exports.getReservationsById = (req, res) => {
    let id = req.query.id
    activiteService.getReservationsById(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateVueActivite = (req, res) => {
    let id = req.query.id
    let vue_activite = req.query.vue_activite
    activiteService.updateVueActivite(id,vue_activite,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getCreneauxByActiviteId = (req, res) => {
    const id = req.params.id;
    activiteService.getCreneauxByActiviteId(id, (err, data) => {
        if (err) return res.status(500).send("Erreur serveur");
        res.status(200).send(data);
    });
};

exports.syncCreneauxForActivite = async (req, res) => {
    const id_activite = req.params.id;
    const { added, modified, deleted } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const e of added) {
            await client.query(
                `INSERT INTO creneau (id_activite, date_activite, heure_debut, heure_fin, places_disponibles)
         VALUES ($1, $2, $3, $4, $5)`,
                [id_activite, e.start.split('T')[0], e.start.split('T')[1], e.end.split('T')[1], e.places || 10]
            );
        }

        for (const e of modified) {
            await client.query(
                `UPDATE creneau SET date_activite=$1, heure_debut=$2, heure_fin=$3 WHERE id_creneau=$4 AND id_activite=$5`,
                [e.start.split('T')[0], e.start.split('T')[1], e.end.split('T')[1], e.id, id_activite]
            );
        }

        for (const id of deleted) {
            await client.query(
                `DELETE FROM creneau WHERE id_creneau=$1 AND id_activite=$2`,
                [id, id_activite]
            );
        }

        await client.query('COMMIT');
        res.status(200).json({ success: true });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

const pool = require('../database/db'); // ou ton instance DB selon ton projet

exports.getActivitesByPrestataire = async (req, res) => {
    const idPrestataire = req.params.id;

    try {
        console.log('[API] Recherche des activités pour le prestataire :', idPrestataire);

        const result = await pool.query(
            'SELECT * FROM activite WHERE id_prestataire = $1',
            [idPrestataire]
        );

        console.log('[API] Activités trouvées :', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('[API] Erreur SQL ou requête :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};


