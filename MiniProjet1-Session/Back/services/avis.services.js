const pool = require("../database/db");

const getAllAvis = (id,callback) => {
    getAllAvisAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllAvisAsync(id) {
    try {
        const conn = await pool.connect();
        const query = `SELECT av.id_avis,av.commentaire,av.note,u.nom, u.prenom FROM Activite a INNER JOIN Avis av ON a.id_activite = av.id_activite INNER JOIN Utilisateur u ON av.id_utilisateur = u.id_utilisateur WHERE a.id_activite = $1`;
        const result = await conn.query(query, [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllAvisAsync:', error);
        throw error;
    }
}

const createAvis = (commentaire, note, id_activite, id_utilisateur,callback) => {
    createAvisAsync(commentaire, note, id_activite, id_utilisateur)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createAvisAsync(commentaire, note, id_activite, id_utilisateur) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Avis (commentaire, note, id_activite, id_utilisateur) VALUES($1,$2,$3,$4)",[commentaire,note,id_activite,id_utilisateur]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createAvis:', error);
        throw error;
    }
}

const updateAvis = (id_avis, commentaire, note, callback) => {
    updateAvisAsync(id_avis, commentaire, note)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateAvisAsync(id_avis, commentaire, note) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Avis SET commentaire = $1, note = $2 WHERE id_avis = $3 RETURNING *",[commentaire, note, id_avis]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateAvis:', error);
        throw error;
    }
}

const deleteAvis = (id_avis,callback)=>{
    deleteAvisAsync(id_avis).
    then(res => {
        callback(null,res);
    }).catch(error => {
        console.log(error);
        callback(error,null)})
}

async function deleteAvisAsync(id_avis) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE from avis WHERE id_avis=$1;",[id_avis])
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteUserAsync:', error);
        throw error;
    }
}


module.exports = {
    getAllAvis: getAllAvis,
    createAvis : createAvis,
    updateAvis : updateAvis,
    deleteAvis : deleteAvis,

}