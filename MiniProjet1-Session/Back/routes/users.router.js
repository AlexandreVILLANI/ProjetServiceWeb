const express = require('express');
let router = express.Router();
const usersController = require('../controllers/users.controller');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id_utilisateur:
 *           type: int
 *           example: "13"
 *         nom:
 *           type: string
 *           example: "Smith"
 *         prenom:
 *           type: string
 *           example: "John"
 *         adresse_mail:
 *           type: string
 *           example: "johnsmith@gmail.com"
 *         mot_de_passe:
 *           type: string
 *           example: "bananeFlambée"
 *         point_fidelite:
 *           type: int
 *           example: 50
 *         id_role:
 *           type: integer
 *           example: 1
 *
 *     UserD:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *
 *     UserActivites:
 *       type: object
 *       properties:
 *         prix_activite:
 *           type: number
 *           example: 40
 *         type_concert:
 *           type: string
 *           example : "METAL"
 *         id_activite:
 *           type: int
 *           example: 7
 *         type_activite:
 *           type: string
 *           example: "Sport"
 *         nom_activite:
 *           type: string
 *           example: "VTT"
 *         images_activite:
 *           type: string
 *           example: "vtt.jpg"
 *         description_activite:
 *           type: string
 *           example: "Pratique du vélo tout-terrain sur des chemins variés."
 *
 *     UserCr:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *           example: "John"
 *         prenom:
 *           type: string
 *           example: "Smith"
 *         mail:
 *           type: string
 *           example: "John.Smith@gmail.com"
 *         password:
 *           type: string
 *           example: "bananeFlambée"
 *         point:
 *           type: int
 *           example: 50
 *         id_role:
 *           type: integer
 *           example: 3
 *
 *     UserU:
 *       type: object
 *       properties:
 *         id_utilisateur:
 *           type: int
 *           example: 1
 *         nom:
 *           type: string
 *           example: "Dupont"
 *         prenom:
 *           type: string
 *           example: "Jean"
 *         mail:
 *           type: string
 *           example: "jean.dupont@gmail.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         point:
 *           type: int
 *           example: 50
 *         id_role:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */


router.get("/",usersController.getUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *        description: Internal error
 */

router.get("/byid", usersController.getUserById);

/**
 * @swagger
 * /users/byid:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         description: "L'identifiant unique de l'utilisateur"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */



router.get("/activites",usersController.getActivitesByPrestataire)
/**
 * @swagger
 * /users/activites:
 *   get:
 *     tags: [Users]
 *     summary: Get activities by prestataire ID
 *     parameters:
 *       - name: id
 *         in: query
 *         description: "L'identifiant du prestataire"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserActivites'
 *       500:
 *         description: Internal server error
 */


router.post("/",usersController.createUser);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCr'
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal error
 */

router.patch("/",usersController.updateUtilisateur);

/**
 * @swagger
 * /users:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserU'
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal error
 */


router.patch("/prestataire",usersController.updatePrestataire);
/**
 * @swagger
 * /users/prestataire:
 *   patch:
 *     tags: [Users]
 *     summary: Update a prestataire's information
 *     description: Updates the `nom_societe` of a prestataire based on the provided `id_prestataire`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_prestataire:
 *                 type: integer
 *                 description: The unique identifier of the prestataire
 *                 example: 1
 *               nom_societe:
 *                 type: string
 *                 description: The new name of the company
 *                 example: "Territoire de belfort"
 *     responses:
 *       200:
 *         description: Prestataire updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_prestataire:
 *                   type: integer
 *                   example: 5
 *                 nom_societe:
 *                   type: string
 *                   example: "Nouvelle Société"
 *       400:
 *         description: Invalid request (e.g., missing or invalid data)
 *       500:
 *         description: Internal server error
 */


router.patch("/delete",usersController.deleteUtilisateur);

/**
 * @swagger
 * /users/delete:
 *   patch:
 *     tags: [Users]
 *     summary: Delete a user by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserD'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       500:
 *         description: Internal server error.
 */

router.get("/reservations",usersController.getAllReservations);
/**
 * @swagger
 * /users/reservations:
 *   get:
 *     tags: [Users]
 *     summary: Get all reservations for a user
 *     description: Retrieves all reservations made by a user based on their user ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: integer
 *           example: 13
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_activite:
 *                     type: integer
 *                     example: 7
 *                   id_creneau:
 *                     type: integer
 *                     example: 15
 *                   type_activite:
 *                     type: string
 *                     example: "Sport"
 *                   nombre_places:
 *                     type: integer
 *                     example: 4
 *                   id_utilisateur:
 *                     type: integer
 *                     example: 13
 *                   date_reservation:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-01"
 *                   date_activite:
 *                     type: string
 *                     format: date
 *                     example: "01-01-2025"
 *                   heure_debut:
 *                     type: string
 *                     example: "10:00"
 *                   heure_fin:
 *                     type: string
 *                     example: "12:00"
 *                   nom_activite:
 *                     type: string
 *                     example: "VTT"
 *                   image_activite:
 *                     type: string
 *                     example: "vtt.jpg"
 *       400:
 *         description: Invalid request (e.g., missing or invalid user ID)
 *       500:
 *         description: Internal server error
 */


router.get("/getBySessionId", usersController.getUserBySessionId);

router.get("/getPrestataireById", usersController.getPrestataireByUserId);

router.get("/prestataires",usersController.getAllPrestataires);

router.post("/prestataire",usersController.createPrestataire);

router.patch("/prestataire/delete",usersController.deletePrestataire);

router.get("/getVueById",usersController.getVueActiviteById)
/**
 * @swagger
 * /users/getVueById:
 *   get:
 *     summary: Get activity details by ID
 *     tags: [Users]
 *     description: Retrieves the details of an activity, including its view count, by its ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The ID of the activity.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 7
 *     responses:
 *       200:
 *         description: Activity details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_activite:
 *                     type: integer
 *                     example: 7
 *                   type_activite:
 *                     type: string
 *                     example: "Outdoor"
 *                   nom_activite:
 *                     type: string
 *                     example: "Mountain Hiking"
 *                   id_prestataire:
 *                     type: integer
 *                     example: 12
 *                   vue_activite:
 *                     type: integer
 *                     example: 150
 *       400:
 *         description: Bad request, invalid or missing parameters
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Internal server error
 */


router.patch("/updateVue", usersController.updateVueActivite);

/**
 * @swagger
 * /users/updateVue:
 *   patch:
 *     summary: Incrémente le nombre de vues d'une activité
 *     tags: [Users]
 *     description: Augmente de 1 le compteur de vues pour une activité spécifique en fonction de son ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_activite:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: Nombre de vues mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_activite:
 *                   type: integer
 *                   example: 7
 *                 vue_activite:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Requête invalide, données manquantes ou incorrectes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "L'id_activite est requis"
 *       404:
 *         description: Activité non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Aucune activité trouvée avec cet ID"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Une erreur est survenue lors de la mise à jour de l'activité"
 */




module.exports = router;