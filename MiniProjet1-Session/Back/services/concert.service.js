const pool = require("../database/db");

const getAllConcert = (callback) => {
    getAllConcertAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllConcertAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT a.id_activite, prix_activite,description_activite,type_concert,nom_activite, image_activite FROM Activite a INNER JOIN Concert c ON a.id_activite = c.id_activite where type_activite=$1",['Concert']);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConcertAsync:', error);
        throw error;
    }
}

const getConcertByIsId = (id,callback) => {
    getConcertByIsIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getConcertByIsIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT c.id_concert, a.id_activite, prix_activite,description_activite,type_concert,nom_activite, image_activite,id_creneau,TO_CHAR(date_activite, 'dd-mm-yyyy') as date_activite,heure_debut,heure_fin,places_disponibles  FROM Activite a INNER JOIN Concert c ON a.id_activite = c.id_activite INNER JOIN creneau c2 on a.id_activite = c2.id_activite where c.id_activite=$1",[ id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdIsAsync:', error);
        throw error;
    }
}


const getConcertById = (id,callback) => {
    getConcertByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getConcertByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT a.id_activite, prix_activite,description_activite,type_concert,nom_activite, image_activite,id_creneau,TO_CHAR(date_activite, 'dd-mm-yyyy') as date_activite,heure_debut,heure_fin,places_disponibles  FROM Activite a INNER JOIN Concert c ON a.id_activite = c.id_activite INNER JOIN creneau c2 on a.id_activite = c2.id_activite where type_activite=$1 AND a.id_activite=$2",['Concert',id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdAsync:', error);
        throw error;
    }
}

const updateConcert = (id,type,callback) => {
    updateConcertAsync(id,type)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateConcertAsync(id,type) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE Concert SET type_concert = $1 WHERE id_activite = $2 RETURNING *",[type,id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdAsync:', error);
        throw error;
    }
}


const createConcert = (id,type,callback) => {
    createConcertAsync(id,type)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createConcertAsync(id,type) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Concert(id_activite,type_concert) VALUES($1,$2)",[id,type]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdAsync:', error);
        throw error;
    }
}

const deleteConcertType = (id,type,callback) => {
    deleteConcertTypeAsync(id,type)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteConcertTypeAsync(type) {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`
    DELETE FROM Activite
    WHERE id_activite
    IN (SELECT id_activite FROM Concert WHERE type_concert = $1);`,[type]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getConcertByIdAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllConcert: getAllConcert,
    getConcertByIsId: getConcertByIsId,
    getConcertById: getConcertById,
    updateConcert: updateConcert,
    createConcert : createConcert,
    deleteConcertType : deleteConcertType

}