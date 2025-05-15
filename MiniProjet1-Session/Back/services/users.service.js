const pool = require("../database/db");

const getAllUsers = (callback) => {
    getAllUsersAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllUsersAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT p.id_utilisateur as isPrestataire ,u.id_utilisateur, nom, prenom,adresse_mail,mot_de_passe,point_fidelite, id_role FROM Utilisateur u LEFT JOIN Prestataire p ON u.id_utilisateur = p.id_utilisateur");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllUsersAsync:', error);
        throw error;
    }
}

const getUserById = (id,callback)=>{
    getUserByIdAsync(id).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function getUserByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT id_utilisateur, nom, prenom,mot_de_passe,point_fidelite, id_role FROM Utilisateur where id_utilisateur = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getUserByIdAsync:', error);
        throw error;
    }
}


const getActivitesByPrestataire = (id,callback)=>{
    getActivitesByPrestataireAsync(id).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function getActivitesByPrestataireAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT prix_activite,c.type_concert,a.id_activite,type_activite,nom_activite,image_activite,description_activite FROM Activite a LEFT JOIN Concert c on a.id_activite = c.id_activite where a.id_prestataire = $1 order by a.id_activite",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getActiviteByPrestataireIdAsync:', error);
        throw error;
    }
}

const createUser = (nom,prenom,mail,mdp,point,id_role,callback)=>{
    createUserAsync(nom,prenom,mail,mdp,point,id_role).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function createUserAsync(nom,prenom,mail,mdp,point,id_role) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Utilisateur(nom, prenom,adresse_mail,mot_de_passe,point_fidelite, id_role) VALUES ($1,$2,$3,$4,$5,$6)",[nom,prenom,mail,mdp,point,id_role])
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createUserAsync:', error);
        throw error;
    }
}


const createPrestataire = (nom_societe,id_utilisateur,callback)=>{
    createPrestataireAsync(nom_societe,id_utilisateur).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function createPrestataireAsync(nom_societe,id_utilisateur) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Prestataire(nom_societe, id_utilisateur) VALUES ($1,$2)",[nom_societe,id_utilisateur])
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createUserAsync:', error);
        throw error;
    }
}

const updateUtilisateur = (nom,prenom,adresse_mail,password,point,id_utilisateur,callback)=>{
    updateUserAsync(nom,prenom,adresse_mail,password,point,id_utilisateur).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function updateUserAsync(nom,prenom,adresse_mail,password,point,id_utilisateur) {
    console.log(id_utilisateur)
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Utilisateur  SET nom=$1, prenom=$2, adresse_mail=$3, mot_de_passe=$4, point_fidelite = $5 WHERE id_utilisateur=$6 RETURNING *;",[nom,prenom,adresse_mail,password,point,id_utilisateur])
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateUserAsync:', error);
        throw error;
    }
}

const updatePrestataire = (id_prestataire,nom_societe,callback)=>{
    updatePrestataireAsync(id_prestataire,nom_societe).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function updatePrestataireAsync(id_prestataire,nom_societe) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Prestataire SET nom_societe=$1 WHERE id_prestataire=$2 RETURNING *;",[nom_societe,id_prestataire])
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateUserAsync:', error);
        throw error;
    }
}


const deleteUtilisateur = (id,callback)=>{
    deleteUserAsync(id).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function deleteUserAsync(id) {
    try {
        const conn = await pool.connect();
        await conn.query("DELETE from prestataire WHERE id_utilisateur=$1 ;",[id])
        await conn.query("DELETE from reservation WHERE id_utilisateur=$1 ;",[id])
        await conn.query("DELETE from avis WHERE id_utilisateur=$1 ;",[id])
        const result = await conn.query("DELETE from Utilisateur WHERE id_utilisateur=$1 RETURNING *;",[id])
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteUserAsync:', error);
        throw error;
    }
}


const deletePrestataire = (id,callback)=>{
    deletePrestataireAsync(id).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function deletePrestataireAsync(id) {
    try {
        const conn = await pool.connect();
        await conn.query("DELETE from activite WHERE id_prestataire=$1 ;",[id])
        await conn.query("DELETE from prestataire WHERE id_prestataire=$1 ;",[id])
        conn.release();
    } catch (error) {
        console.error('Error in deletePrestataireAsync:', error);
        throw error;
    }
}

const getAllReservations = (id,callback)=>{
    getAllReservationsAsync(id).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function getAllReservationsAsync(id) {
    try {
        const conn = await pool.connect();
        let result = await conn.query("SELECT c.id_activite,r.id_creneau,type_activite, nombre_places, r.id_utilisateur, TO_CHAR(date_reservation, 'yyyy-mm-dd') as date_reservation,TO_CHAR(date_activite, 'dd-mm-yyyy') as date_activite,heure_debut,heure_fin,nom_activite,image_activite FROM Reservation r left JOIN Creneau c on r.id_creneau = c.id_creneau INNER JOIN Activite a on c.id_activite = a.id_activite where r.id_utilisateur = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllReservationsAsync:', error);
        throw error;
    }
}


const loginUtilisateur = (email,password,callback) => {
    loginUtilisateurAsync(email,password)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function loginUtilisateurAsync(email,password) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * from Utilisateur where adresse_mail = $1 and mot_de_passe = $2",[email,password]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllUsersAsync:', error);
        throw error;
    }
}


const loginPrestataire = (id,callback) => {
    loginPrestataireAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function loginPrestataireAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * from Prestataire where id_utilisateur=$1 ",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in loginPrestataireAsync:', error);
        throw error;
    }
}

const getUserBySessionId = (session_id, callback) => {
    getUserBySessionIdAsync(session_id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback('Error in getUserBySessionId', null);
        })
}

async function getUserBySessionIdAsync(session_id) {


    try {
        const client = await pool.connect();
        const res = await client.query("SELECT utilisateur.id_utilisateur, id_role,adresse_mail, prenom,nom, point_fidelite,session_id " +
            "FROM session\n" +
            "LEFT JOIN utilisateur on session.id_utilisateur = utilisateur.id_utilisateur\n" +
            "WHERE session_id = $1;", [session_id]);
        client.release();

        return res.rows[0];
    } catch (error) {
        console.error('Error in getUserBySessionIdAsync:', error);
        throw error;
    }
}

const getPrestataireByUserId = (id, callback) => {
    getPrestataireByUserIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback('Error in getUserBySessionId', null);
        })
}

async function getPrestataireByUserIdAsync(id) {


    try {
        const client = await pool.connect();
        const res = await client.query("SELECT nom_societe,id_prestataire\n " +
            "FROM Prestataire\n" +
            "LEFT JOIN utilisateur on prestataire.id_utilisateur = utilisateur.id_utilisateur\n" +
            "WHERE utilisateur.id_utilisateur = $1;", [id]);
        client.release();

        return res.rows[0];
    } catch (error) {
        console.error('Error in getUserBySessionIdAsync:', error);
        throw error;
    }
}

const getAllPrestataires = (callback) => {
    getAllPrestatairesAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback('Error in getUserBySessionId', null);
        })
}

async function getAllPrestatairesAsync() {


    try {
        const client = await pool.connect();
        const res = await client.query("SELECT nom_societe,id_prestataire,prestataire.id_utilisateur,utilisateur.adresse_mail\n " +
            "FROM Prestataire\n" +
            "Inner JOIN utilisateur on prestataire.id_utilisateur = utilisateur.id_utilisateur\n");
        client.release();

        return res.rows;
    } catch (error) {
        console.error('Error in getUserBySessionIdAsync:', error);
        throw error;
    }
}

const getVueActiviteById = (id,callback)=>{
    getVueActiviteByIdAsync(id).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function getVueActiviteByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT id_activite, type_activite,nom_activite,id_prestataire,vue_activite FROM Activite where id_activite = $1",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getVueActiviteByIdAsync:', error);
        throw error;
    }
}

const updateVueActivite = (id_activite, callback) => {
    updateVueActiviteAsync(id_activite)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
};

async function updateVueActiviteAsync(id_activite) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(
            "UPDATE Activite SET vue_activite = vue_activite + 1 WHERE id_activite = $1 RETURNING *;",
            [id_activite]
        );
        conn.release();
        return result.rows;
    } catch (error) {
        console.error("Error in updateVueActiviteAsync:", error);
        throw error;
    }
}





module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUtilisateur:updateUtilisateur,
    getAllReservations: getAllReservations,
    loginUtilisateur : loginUtilisateur,
    deleteUtilisateur: deleteUtilisateur,
    loginPrestataire: loginPrestataire,
    updatePrestataire: updatePrestataire,
    getActivitesByPrestataire : getActivitesByPrestataire,
    getUserBySessionId : getUserBySessionId,
    getPrestataireByUserId : getPrestataireByUserId,
    getAllPrestataires : getAllPrestataires,
    createPrestataire : createPrestataire,
    deletePrestataire : deletePrestataire,
    getVueActiviteById : getVueActiviteById,
    updateVueActivite : updateVueActivite
}
