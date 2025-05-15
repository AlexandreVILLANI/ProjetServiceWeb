const express = require('express');
let router = express.Router();
const avisController = require('../controllers/avis.controller');
const avisMiddleware = require('../middleware/avis.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Avis:
 *       type: object
 *       properties:
 *         id_avis:
 *           type: integer
 *           description: "L'identifiant unique de l'avis."
 *         commentaire:
 *           type: string
 *           maxLength: 500
 *           description: "Le commentaire de l'avis."
 *         note:
 *           type: number
 *           format: float
 *           description: "La note associée à l'avis."
 *         id_activite:
 *           type: integer
 *           description: "L'identifiant de l'activité associée à l'avis."
 *
 *     AvisU:
 *       type: object
 *       properties:
 *         id_avis:
 *           type: integer
 *           example: 1
 *         commentaire:
 *           type: string
 *           example: "Super"
 *         note:
 *           type: integer
 *           example: 2
 */


/**
 * @swagger
 * tags:
 *   name: Avis
 *   description: The Avis managing API
 */

router.get("/", avisController.getAllAvis);

/**
 * @swagger
 * /avis:
 *   get:
 *     tags: [Avis]
 *     summary: Get a list of all avis by activite
 *     parameters:
 *       - name: id
 *         in: query
 *         description: L'ID pour filtrer les avis
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of avis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avis'
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/create", avisController.createAvis);

/**
 * @swagger
 * /avis/create:
 *   post:
 *     tags: [Avis]
 *     summary: Create a new avis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentaire
 *               - note
 *               - id_activite
 *               - id_utilisateur
 *             properties:
 *               commentaire:
 *                 type: string
 *                 description: "Le commentaire de l'avis."
 *               note:
 *                 type: number
 *                 format: float
 *                 description: "La note associée à l'avis."
 *               id_activite:
 *                 type: integer
 *                 description: "L'identifiant de l'activité associée à l'avis."
 *               id_utilisateur:
 *                 type: integer
 *                 description: "L'identifiant de l'utilisateur."
 *     responses:
 *       200:
 *         description: Avis created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avis'
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.patch("/update", avisController.updateAvis);

/**
 * @swagger
 * /avis/update:
 *   patch:
 *     tags: [Avis]
 *     summary: Update an avis by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvisU'
 *     responses:
 *       200:
 *         description: Avis updated successfully.
 *       500:
 *         description: Internal server error.
 */


router.patch("/delete", avisController.deleteAvis)
/**
 * @swagger
 * /avis/delete :
 *   delete :
 *     tags : [Avis]
 *     summary : Delete an avis by ID
 *     requestBody :
 *       required : true
 *       content :
 *         application/json :
 *           schema :
 *             type : object
 *             required :
 *               - id_avis
 *             properties :
 *               id_avis :
 *                 type : integer
 *                 description : "L'identifiant de l'avis à supprimer."
 *     responses :
 *       200 :
 *         description : Avis supprimé avec succès
 *         content :
 *           application/json :
 *             schema :
 *               type : object
 *               properties :
 *                 message :
 *                   type : string
 *                   example : "Avis supprimé avec succès"
 *       400 :
 *         description : Mauvaise requête (ID manquant ou invalide)
 *       500 :
 *         description : Erreur interne du serveur
 *         content :
 *           application/json :
 *             schema :
 *               type : object
 *               properties :
 *                 message :
 *                   type : string
 *                   example : "Internal server error"
 */


module.exports = router;
