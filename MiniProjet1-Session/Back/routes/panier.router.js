const express = require('express');
let router = express.Router();
const panierController = require('../controllers/panier.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Panier:
 *       type: object
 *       properties:
 *         id_panier:
 *           type: integer
 *           description: "L'identifiant unique du panier."
 *         id_utilisateur:
 *           type: integer
 *           description: "L'identifiant unique de l'utilisateur."
 *         id_creneau:
 *           type: integer
 *           description: "L'identifiant unique du créneau."
 *         id_article:
 *           type: integer
 *           description: "L'identifiant unique de l'article."
 *         nombre_articles:
 *          type: integer
 *          description : "le nombres d'articles en stocks."
 *         prix:
 *           type: number
 *           format: float
 *           description: "Le prix de l'article ou de la réservation."
 *
 *     PanierActiviteExample:
 *       type: object
 *       properties:
 *         id_panier:
 *           type: integer
 *           example: 1
 *         id_utilisateur:
 *           type: integer
 *           example: "1"
 *         id_creneau:
 *           type: integer
 *           example: "1"
 *         nombre_articles:
 *           type: integer
 *           example: "12"
 *         prix:
 *           type: number
 *           example: "12.99"
 *
 *     PanierArticleExample:
 *       type: object
 *       properties:
 *         id_panier:
 *           type: integer
 *           example: 1
 *         id_utilisateur:
 *           type: integer
 *           example: "1"
 *         id_article:
 *           type: integer
 *           example: "1"
 *         nombre_articles:
 *           type: integer
 *           example: "12"
 *         prix:
 *           type: number
 *           example: "12.99"
 */

/**
 * @swagger
 * tags:
 *   name: Panier
 *   description: The Panier managing API
 */

router.post("/activite",panierController.addToPanierActivite)

router.get("/activite",panierController.getPanierActivite)

router.patch("/activite",panierController.deletePanierActivite)

router.post("/article",panierController.addToPanierArticle)

router.get("/article",panierController.getPanierArticle)

router.patch("/article",panierController.deletePanierArticle)

router.post("/achat",panierController.createAchat)

router.get("/achat",panierController.getAchats)



module.exports = router;