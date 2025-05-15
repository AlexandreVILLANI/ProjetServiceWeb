const express = require('express');
let router = express.Router();
const concertController = require('../controllers/concert.controller');
const concertMiddleware = require('../middleware/concert.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Concert:
 *       type: object
 *       properties:
 *         id_activite:
 *           type: integer
 *           example: 14
 *         prix_activite:
 *           type: number
 *           format: float
 *           example: 20.00
 *         description_activite:
 *           type: string
 *           example: "Café-concert proposant des soirées animées."
 *         type_concert:
 *           type: string
 *           example: "METAL"
 *         nom_activite:
 *           type: string
 *           example: "What’s up Doc"
 *         image_activite:
 *           type: string
 *           example: "whats_up_doc.jpg"
 *
 *     ConcertA:
 *       type: object
 *       properties:
 *         id_activite:
 *           type: integer
 *           example: 14
 *         prix_activite:
 *           type: number
 *           format: float
 *           example: 20.00
 *         description_activite:
 *           type: string
 *           example: "Café-concert proposant des soirées animées."
 *         type_concert:
 *           type: string
 *           example: "METAL"
 *         nom_activite:
 *           type: string
 *           example: "What’s up Doc"
 *         image_activite:
 *           type: string
 *           example: "whats_up_doc.jpg"
 *         id_creneau:
 *           type: integer
 *           example: 13
 *         date_activite:
 *           type: string
 *           format: date
 *           example: "2024-12-20"
 *         heure_debut:
 *           type: string
 *           format: time
 *           example: "20:00:00"
 *         heure_fin:
 *           type: string
 *           format: time
 *           example: "23:00:00"
 *         places_disponibles:
 *           type: integer
 *           example: 100
 *
 *     ConcertId:
 *       type: object
 *       properties:
 *         id_concert:
 *           type: integer
 *           description: "L'identifiant unique du concert."
 *           example: 1
 *         id_activite:
 *           type: integer
 *           example: 14
 *         prix_activite:
 *           type: number
 *           format: float
 *           example: 20.00
 *         description_activite:
 *           type: string
 *           example: "Café-concert proposant des soirées animées."
 *         type_concert:
 *           type: string
 *           example: "METAL"
 *         nom_activite:
 *           type: string
 *           example: "What’s up Doc"
 *         image_activite:
 *           type: string
 *           example: "whats_up_doc.jpg"
 *         id_creneau:
 *           type: integer
 *           example: 13
 *         date_activite:
 *           type: string
 *           format: date
 *           example: "2024-12-20"
 *         heure_debut:
 *           type: string
 *           format: time
 *           example: "20:00:00"
 *         heure_fin:
 *           type: string
 *           format: time
 *           example: "23:00:00"
 *         places_disponibles:
 *           type: integer
 *           example: 100
 */


/**
 * @swagger
 * tags:
 *   name: Concert
 *   description: The culture managing API
 */

router.get("/",concertController.getAllConcert);
/**
 * @swagger
 * /concert:
 *   get:
 *     tags: [Concert]
 *     summary: Get a list of all concert
 *     responses:
 *       200:
 *         description: A list of concert
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Concert'
 *       500:
 *        description: Internal error
 */

router.get("/id",concertController.getConcertByIsId);
/**
 * @swagger
 * /concert/id:
 *   get:
 *     summary: "Récupérer un concert par son identifiant"
 *     description: "Retourne les informations d'un concert en fonction de l'id passé en paramètre."
 *     parameters:
 *       - name: id
 *         in: query
 *         description: "L'identifiant unique du concert"
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: "Concert trouvé avec succès"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConcertId'
 *       500:
 *         description: "Erreur interne du serveur"
 *         content:
 *           text/plain:
 *             example: "Internal error"
 *       400:
 *         description: "Mauvaise requête (paramètre manquant ou invalide)"
 *         content:
 *           text/plain:
 *             example: "Bad request"
 *     tags:
 *       - Concert
 */




router.get("/idActivite",concertController.getConcertById);
/**
 * @swagger
 * /concert/idActivite:
 *   get:
 *     tags: [Concert]
 *     summary: Get a concert by ID of an activite
 *     parameters:
 *       - name: id
 *         in: query
 *         description: L'identifiant unique du concert
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Les informations du concert récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConcertA'
 *       400:
 *         description: Paramètre ID manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing ID parameter"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.patch("/",concertController.updateConcert);
/**
 * @swagger
 * /concert:
 *   patch:
 *     tags: [Concert]
 *     summary: Mettre à jour le type d'un concert selon l'ID.
 *     description: Permet de modifier le type de concert pour un concert spécifique, identifié par son `id_activite`.
 *     parameters:
 *       - name: id_activite
 *         in: query
 *         description: L'ID du concert à mettre à jour.
 *         required: true
 *         type: integer
 *         example: 14
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_concert:
 *                 type: string
 *                 example: "METAL"
 *     responses:
 *       200:
 *         description: Concert mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_activite:
 *                   type: integer
 *                   example: 14
 *                 type_concert:
 *                   type: string
 *                   example: "METAL"
 *       400:
 *         description: Mauvaise requête (si des paramètres sont manquants ou invalides).
 *       500:
 *         description: Erreur interne du serveur.
 */

router.post("/",concertController.createConcert)
/**
 * @swagger
 * /concert:
 *   post:
 *     tags: [Concert]
 *     summary: Créer un nouveau concert.
 *     description: Permet de créer un nouveau concert avec `id_activite` et `type_concert`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_activite:
 *                 type: integer
 *                 example: 14
 *               type_concert:
 *                 type: string
 *                 example: "METAL"
 *     responses:
 *       200:
 *         description: Concert créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_activite:
 *                   type: integer
 *                   example: 14
 *                 type_concert:
 *                   type: string
 *                   example: "METAL"
 *       400:
 *         description: Mauvaise requête (si des paramètres sont manquants ou invalides).
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/delete",concertController.deleteConcertType)


module.exports = router;