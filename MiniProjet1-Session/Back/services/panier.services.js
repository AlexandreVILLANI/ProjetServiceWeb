const pool = require("../database/db");

const addToPanierActivite = (id_utilisateur,id_creneau,nombre_articles,prix,callback) => {
    addToPanierActiviteAsync(id_utilisateur,id_creneau,nombre_articles,prix)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addToPanierActiviteAsync(id_utilisateur,id_creneau,nombre_articles,prix) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Panier_Activite(id_utilisateur,id_creneau,nombre_articles,prix) VALUES ($1,$2,$3,$4)",[id_utilisateur,id_creneau,nombre_articles,prix]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConcertAsync:', error);
        throw error;
    }
}

const getPanierActivite = (id_utilisateur,callback) => {
    getPanierActiviteAsync(id_utilisateur)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getPanierActiviteAsync(id_utilisateur) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT p.id_panier,a.nom_activite,p.prix,p.nombre_articles,c.id_creneau FROM Panier_Activite p INNER JOIN Creneau c on p.id_creneau = c.id_creneau INNER JOIN Activite a on c.id_activite = a.id_activite WHERE id_utilisateur = $1",[id_utilisateur]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConcertAsync:', error);
        throw error;
    }
}


const deletePanierActivite = (id,callback) => {
    deletePanierActiviteAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deletePanierActiviteAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE FROM Panier_activite WHERE id_panier = $1", [id]);
        conn.release();
        console.log(result.rows)
        return result.rows;
    } catch (error) {
        console.error('Error in getAllConcertAsync:', error);
        throw error;
    }
}

// panier article boutique

const addToPanierArticle = (id_utilisateur,id_article,nombre_articles,prix,payment,callback) => {
    addToPanierArticleAsync(id_utilisateur,id_article,nombre_articles,prix,payment)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addToPanierArticleAsync(id_utilisateur,id_article,nombre_articles,prix,payment) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Panier_article(id_utilisateur,id_article,nombre_articles,prix,payment) VALUES ($1,$2,$3,$4,$5) RETURNING *",[id_utilisateur,id_article,nombre_articles,prix,payment]);
        conn.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error in addToPanierAsync:', error);
        throw error;
    }
}

const getPanierArticle = (id_utilisateur,callback) => {
    getPanierArticleAsync(id_utilisateur)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getPanierArticleAsync(id_utilisateur) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT p.id_panier,b.nom_article,p.prix,p.nombre_articles,b.id_article,p.payment FROM Panier_article p INNER JOIN Boutique b on p.id_article = b.id_article WHERE id_utilisateur = $1",[id_utilisateur]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getPanierArticleAsync:', error);
        throw error;
    }
}


const deletePanierArticle = (id,callback) => {
    deletePanierArticleAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deletePanierArticleAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE FROM Panier_article WHERE id_panier = $1", [id]);
        conn.release();
        console.log(result.rows)
        return result.rows;
    } catch (error) {
        console.error('Error in deletePanierArticleAsync:', error);
        throw error;
    }
}

const createAchat = (id_utilisateur,id_article,nombre_articles,nom_article,callback) => {
    createAchatAsync(id_utilisateur,id_article,nombre_articles,nom_article)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createAchatAsync(id_utilisateur,id_article,nombre_articles,nom_article) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO Achats(id_utilisateur,id_article,nom_article,nombre_articles) VALUES ($1,$2,$3,$4) RETURNING *",[id_utilisateur,id_article,nom_article,nombre_articles]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in addToPanierAsync:', error);
        throw error;
    }
}

const getAchats = (id_utilisateur,callback) => {
    getAchatsAsync(id_utilisateur)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAchatsAsync(id_utilisateur) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM ACHATS WHERE id_utilisateur = $1",[id_utilisateur]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAchatsAsync:', error);
        throw error;
    }
}

module.exports = {
    addToPanierActivite : addToPanierActivite,
    getPanierActivite : getPanierActivite,
    deletePanierActivite : deletePanierActivite,

    addToPanierArticle : addToPanierArticle,
    getPanierArticle : getPanierArticle,
    deletePanierArticle : deletePanierArticle,
    createAchat : createAchat,
    getAchats : getAchats

}