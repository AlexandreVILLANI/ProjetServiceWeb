const pool = require("../database/db");

const getAllArticle = (callback) => {
    getAllArticleAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllArticleAsync() {
    try {
        const conn = await pool.connect();
        const query = `SELECT id_article,type_article, nom_article, description_article, image_article,nombre_article, prix_article,prix_article_point FROM Boutique`;
        const result = await conn.query(query);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllArticleAsync:', error);
        throw error;
    }
}

const getArticleById = (id, callback) => {
    getArticleByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getArticleByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const query = `SELECT id_article, type_article, nom_article, description_article, image_article, nombre_article,prix_article,prix_article_point FROM Boutique WHERE id_article = $1`;
        const result = await conn.query(query, [id]);
        conn.release();
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error in getArticleByIdAsync:', error);
        throw error;
    }
}
module.exports = {
   getAllArticle : getAllArticle,
    getArticleById : getArticleById
}