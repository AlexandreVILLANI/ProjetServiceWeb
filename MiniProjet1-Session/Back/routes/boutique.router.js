const express = require('express');
let router = express.Router();
const boutiqueController = require('../controllers/boutique.controller');
const boutiqueMiddleware = require('../middleware/boutique.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Boutique:
 *       type: object
 *       properties:
 *         id_article:
 *           type: integer
 *           description: "L'identifiant unique de l'article."
 *         type_article:
 *           type: string
 *           description: "Le type de l'article (par exemple : vêtement, accessoire, etc.)."
 *         nom_article:
 *           type: string
 *           maxLength: 50
 *           description: "Le nom de l'article."
 *         description_article:
 *           type: string
 *           maxLength: 1000
 *           description: "La description détaillée de l'article."
 *         image_article:
 *           type: string
 *           format: uri
 *           description: "L'URL de l'image de l'article."
 *         nombre_article:
 *          type: integer
 *          description : "le nombres d'articles en stocks."
 *         prix_article:
 *           type: number
 *           format: float
 *           description: "Le prix de l'article."
 *
 *     BoutiqueExample:
 *       type: object
 *       properties:
 *         id_article:
 *           type: integer
 *           example: 101
 *         type_article:
 *           type: string
 *           example: "Accessoire"
 *         nom_article:
 *           type: string
 *           example: "Porte-clé Lion de Belfort"
 *         description_article:
 *           type: string
 *           example: "Un magnifique porte-clé en métal représentant le célèbre Lion de Belfort."
 *         image_article:
 *           type: string
 *           example: "lionBelfortPorteCle.jpg"
 *         nombre_article:
 *          type: integer
 *          example : 100
 *         prix_article:
 *           type: number
 *           example: 9.99
 */

/**
 * @swagger
 * tags:
 *   name: Boutique
 *   description: The Boutique managing API
 */

router.get("/", boutiqueController.getAllArticle);
/**
 * @swagger
 * /boutique:
 *   get:
 *     tags: [Boutique]
 *     summary: Get a list of all articles in the boutique
 *     responses:
 *       200:
 *         description: A list of articles in the boutique
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoutiqueExample'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/id",boutiqueController.getArticleById);
/**
 * @swagger
 * /boutique/id:
 *   get:
 *     tags: [Boutique]
 *     summary: Get an article by its id
 *     description: Retrieve detailed information about an article by its unique ID, including its schedule and available places.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique ID of the article you want to retrieve.
 *     responses:
 *       200:
 *         description: The article object with the specified id, including its schedule and available places.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoutiqueExample'
 *       400:
 *         description: Bad request. The ID provided is not valid.
 *       404:
 *         description: Article not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */

module.exports = router;
