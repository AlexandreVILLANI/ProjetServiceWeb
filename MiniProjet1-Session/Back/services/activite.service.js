const pool = require("../database/db");

const getAllActiviteByType = (type,callback) => {
    getAllActiviteByTypeAsync(type)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllActiviteByTypeAsync(type) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT a.id_activite, prix_activite,description_activite,nom_activite, image_activite FROM Activite a where type_activite=$1",[type]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllActiviteByTypeAsync:', error);
        throw error;
    }
}


const getActiviteById = (id,callback) => {
    getActiviteByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getActiviteByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT a.id_activite, prix_activite,description_activite,nom_activite, image_activite,id_creneau,TO_CHAR(date_activite, 'dd-mm-yyyy') as date_activite,heure_debut,heure_fin,places_disponibles  FROM Activite a INNER JOIN creneau c2 on a.id_activite = c2.id_activite WHERE a.id_activite=$1 ORDER BY id_creneau",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdAsync:', error);
        throw error;
    }
}

const getMoyenneNote = (callback) => {
    getMoyenneNoteAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getMoyenneNoteAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT id_activite,avg(note) FROM avis group by id_activite");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdAsync:', error);
        throw error;
    }
}


const updateNbPlaces = (id,nb,callback) => {
    updateNbPlacesAsync(id,nb)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateNbPlacesAsync(id,nb) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE creneau SET places_disponibles = places_disponibles - $1 where id_creneau = $2",[nb,id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in UPDATENBPLACEASYNC:', error);
        throw error;
    }
}

const updateActivite = (id,nom,prix,description,callback) => {
    updateActiviteAsync(id,nom,prix,description)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateActiviteAsync(id,nom,prix,description) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Activite SET nom_activite = $1, prix_activite=$2 , description_activite = $3  where id_activite = $4",[nom,prix,description,id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in UPDATENBPLACEASYNC:', error);
        throw error;
    }
}

const updateCreneau = (id,date,heure_debut,heure_fin,places,callback) => {
    updateCreneauAsync(id,date,heure_debut,heure_fin,places)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateCreneauAsync(id,date,heure_debut,heure_fin,places) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Creneau SET date_activite = $1, heure_debut=$2 , heure_fin = $3, places_disponibles = $4  where id_creneau = $5",[date,heure_debut,heure_fin,places,id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in UPDATENBPLACEASYNC:', error);
        throw error;
    }
}

const createReservation = (id_utilisateur,id_creneau,nb,callback) => {
    createReservationAsync(id_utilisateur,id_creneau,nb)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createReservationAsync(id_utilisateur,id_creneau,nb) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Reservation(id_creneau,nombre_places,id_utilisateur) VALUES($1,$2,$3)",[id_creneau,nb,id_utilisateur]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createReservation:', error);
        throw error;
    }
}

const createActivite = (id,nom,type,image,prix,description,callback) => {
    createActiviteAsync(id,nom,type,image,prix,description)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createActiviteAsync(id,nom,type,image,prix,description) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Activite(type_activite,nom_activite,image_activite,description_activite,prix_activite,id_prestataire) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[type,nom,image,description,prix,id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createReservation:', error);
        throw error;
    }
}

const deleteActivite = (id,callback) => {
    deleteActiviteAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteActiviteAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE From Activite where id_activite = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteActivite:', error);
        throw error;
    }
}

const deleteCreneau = (id,callback) => {
    deleteCreneauAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteCreneauAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE From Creneau where id_creneau = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteActivite:', error);
        throw error;
    }
}

const createCreneau = (id,date,fin,debut,places,callback) => {
    createCreneauAsync(id,date,fin,debut,places)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createCreneauAsync(id,date,fin,debut,places) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Creneau(id_activite,date_activite,heure_debut,heure_fin,places_disponibles) VALUES($1,$2,$3,$4,$5) RETURNING *",[id,date,debut,fin,places]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createReservation:', error);
        throw error;
    }
}


const getReservationsById = (id,callback) => {
    getReservationsByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getReservationsByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT r.id_reservation,r.nombre_places,TO_CHAR(date_activite, 'dd-mm-yyyy') as date_activite,c.heure_debut,c.heure_fin,u.nom,u.prenom,u.adresse_mail  FROM Reservation r INNER JOIN Creneau c on r.id_creneau = c.id_creneau INNER JOIN Utilisateur u on r.id_utilisateur = u .id_utilisateur WHERE c.id_activite = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getReservationsByIdAsync:', error);
        throw error;
    }
}


const deleteReservation = (id,callback) => {
    deleteReservationAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteReservationAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE From Reservation where id_reservation = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteActivite:', error);
        throw error;
    }
}

const updateVueActivite = (id,vue_activite,callback) => {
    updateVueActiviteAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateVueActiviteAsync(id,vue_activite) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Activite SET vue_activite = $2 where id_activite = $1",[id,vue_activite]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateVueActivite:', error);
        throw error;
    }
}

async function getCreneauxByActiviteIdAsync(id) {
    const conn = await pool.connect();
    const result = await conn.query(
        `SELECT id_creneau as id, 
            CONCAT(nom_activite, ' (', heure_debut, '-', heure_fin, ')') as title,
            TO_CHAR(date_activite, 'YYYY-MM-DD') || 'T' || heure_debut AS start,
            TO_CHAR(date_activite, 'YYYY-MM-DD') || 'T' || heure_fin AS end
     FROM creneau c
     INNER JOIN activite a ON a.id_activite = c.id_activite
     WHERE c.id_activite = $1`,
        [id]
    );
    conn.release();
    return result.rows;
}

const getCreneauxByActiviteId = (id, cb) => {
    getCreneauxByActiviteIdAsync(id)
        .then(res => cb(null, res))
        .catch(err => cb(err, null));
};





module.exports = {
    getCreneauxByActiviteId,
    getActiviteById: getActiviteById,
    updateNbPlaces: updateNbPlaces,
    createReservation: createReservation,
    getAllActiviteByType: getAllActiviteByType,
    getMoyenneNote: getMoyenneNote,
    updateActivite: updateActivite,
    updateCreneau: updateCreneau,
    createActivite : createActivite,
    deleteActivite : deleteActivite,
    deleteCreneau : deleteCreneau,
    creerCreneau : createCreneau,
    getReservationsById : getReservationsById,
    deleteReservation : deleteReservation,
    updateVueActivite : updateVueActivite
}