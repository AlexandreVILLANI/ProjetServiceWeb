const express = require('express');
let router = express.Router();
const activiteController = require('../controllers/activite.controller');


router.get('/prestataire/:id', activiteController.getActivitesByPrestataire);
/**
 * @swagger
 * components:
 *   schemas:
 *     ActiviteC:
 *       type: object
 *       properties:
 *         id_activite:
 *           type: integer
 *           example: 12
 *         prix_activite:
 *           type: double
 *           example: 25
 *         description_activite:
 *           type: string
 *           example: "super activite"
 *         nom_activite:
 *           type: string
 *           example: "lion belfort"
 *         image_activite:
 *           type: string
 *           example: "lion.png"
 *         id_creneau:
 *           type: integer
 *           example: 1
 *         date_activite:
 *           type: date
 *           example: 10-12-2024
 *         heure_debut:
 *           type: date
 *           example: 14:00:00
 *         heure_fin:
 *           type: date
 *           example: 16:00:00
 *         places_disponibles:
 *           type: int
 *           example: 25
 *
 *     Activite:
 *       type: object
 *       properties:
 *         id_activite:
 *           type: integer
 *           example: 12
 *         prix_activite:
 *           type: double
 *           example: 25
 *         nom_activite:
 *           type: string
 *           example: "lion belfort"
 *         image_activite:
 *           type: string
 *           example: "lion.png"
 *         description_activite:
 *           type: string
 *           example: "super activite"
 *
 *
 *     MoyenneNote:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         avg:
 *           type: number
 *           format: float
 *           example: 4.5
 *     nb:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         nb:
 *           type: int
 *           example: 25
 *
 *     Reservation:
 *       type: object
 *       properties:
 *         id_utilisateur:
 *           type: int
 *           example: 1
 *         id_creneau:
 *           type: int
 *           example: 2
 *         nb:
 *           type: int
 *           example: 20
 *
 *     ActiviteM:
 *       type: object
 *       properties:
 *         id_activite:
 *           type: int
 *           example: 1
 *         nom_activite:
 *           type: string
 *           example: Tajmahal
 *         prix_activite:
 *           type: double
 *           example: 25
 *         description_activite:
 *           type: string
 *           example: Restaurant indien proposant une cuisine authentique.
 *
 *     Creneau:
 *       type: object
 *       properties:
 *         id_creneau:
 *           type: int
 *           example: 1
 *         date_activite:
 *           type: date
 *           example: 2025-04-03
 *         heure_debut:
 *           type: time
 *           example: 10:00:00
 *         heure_fin:
 *           type: time
 *           example: 12:00:00
 *         places_disponibles:
 *           type: int
 *           example: 30
 *
 *     NewActivite:
 *       type: object
 *       properties:
 *         nom_activite:
 *           type: string
 *           example: Burger King
 *         type_activite:
 *           type: string
 *           example: Restauration
 *         image_activite:
 *           type: string
 *           example: BurgerKing.png
 *         prix_activite:
 *           type: double
 *           example: 15
 *         description_activite:
 *           type: string
 *           example: Fast Food de qualité
 *         id_prestataire:
 *           type: int
 *           example: 3
 *
 *     NewCreneau:
 *       type: object
 *       properties:
 *         id_activite:
 *           type: int
 *           example: 1
 *         date_activite:
 *           type: date
 *           example: 10-01-2025
 *         heure_debut:
 *           type: time
 *           example: 12:00:00
 *         heure_fin:
 *           type: time
 *           example: 14:00:00
 *         places_disponibles:
 *           type: int
 *           example: 20
 *
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Activite
 *   description: The activite managing API
 */

router.get("/id", activiteController.getActiviteById);

/**
* @swagger
* /activite/id:
*   get:
    *     tags: [Activite]
*     summary: Get an activite by its id
*     description: Retrieve detailed information about an activite by its unique ID, including its schedule and available places.
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The unique ID of the activite you want to retrieve.
*     responses:
*       200:
*         description: The activite object with the specified id, including its schedule and available places.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/ActiviteC'
*       400:
*         description: Bad request. The ID provided is not valid.
*       404:
*         description: Activite not found with the provided ID.
*       500:
*         description: Internal server error.
*/


router.get("/type", activiteController.getAllActiviteByType);

/**
 * @swagger
 * /activite/type:
 *   get:
 *     tags: [Activite]
 *     summary: Get all activites by type
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of activites to retrieve
 *     responses:
 *       200:
 *         description: A list of activites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activite'
 *       500:
 *         description: Internal error
 */

// Route: Get moyenne note of an activite by its id
router.get("/moyenneNote", activiteController.getMoyenneNote);

/**
 * @swagger
 * /activite/moyenneNote:
 *   get:
 *     tags: [Activite]
 *     summary: Get the moyenne note of all activites
 *     responses:
 *       200:
 *         description: The moyenne note of the activites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoyenneNote'
 *       500:
 *         description: Internal error
 */



router.patch("/nb",activiteController.updateNbPlaces);
/**
 * @swagger
 * /activite/nb:
 *   patch:
 *     tags: [Activite]
 *     summary: Update nombre_places_disponibles of an activite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nb'
 *     responses:
 *       200:
 *         description: Activite successfully updated
 *       500:
 *         description: Internal error
 */

router.patch("/",activiteController.updateActivite);
/**
 * @swagger
 * /activite:
 *   patch:
 *     tags: [Activite]
 *     summary: Update an activite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActiviteM'
 *     responses:
 *       200:
 *         description: Activite successfully updated
 *       500:
 *         description: Internal error
 */

router.patch("/creneau",activiteController.updateCreneau);


/**
 * @swagger
 * /activite/creneau:
 *   patch:
 *     tags: [Activite]
 *     summary: Update a creneau
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Creneau'
 *     responses:
 *       200:
 *         description: Creneau successfully updated
 *       500:
 *         description: Internal error
 */

router.get("/reservations", activiteController.getReservationsById);

/**
 * @swagger
 * /activite/reservations:
 *   get:
 *     tags: [Activite]
 *     summary: Get all reservations of an activite
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the activite
 *     responses:
 *       200:
 *         description: A list of reservation
 *       500:
 *         description: Internal error
 */

router.patch("/deleteReservation", activiteController.deleteReservation);

router.post("/reservation",activiteController.createReservation)
/**
 * @swagger
 * /activite/reservation:
 *   post:
 *     tags: [Activite]
 *     summary: Create a new reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation successfully created
 *       500:
 *         description: Internal error
 */

router.post("/creer",activiteController.createActivite)


/**
 * @swagger
 * /activite/creer:
 *   post:
 *     tags: [Activite]
 *     summary: Create a new activite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewActivite'
 *     responses:
 *       200:
 *         description: Activite successfully created
 *       500:
 *         description: Internal error
 */

router.patch("/delete",activiteController.deleteActivite)

/**
 * @swagger
 * /activite/delete:
 *   patch:
 *     tags: [Activite]
 *     summary: delete an activite by its id
 *     requestBody :
 *       required : true
 *       content :
 *         application/json :
 *           schema :
 *             type : object
 *             required :
 *               - id
 *             properties :
 *               id :
 *                 type : integer
 *                 example : 1
 *                 description : "L'identifiant de l'activite à supprimer."
 *     responses:
 *       200:
 *         description: Activite successfully deleted
 *       500:
 *         description: Internal error
 */

router.patch("/deleteCreneau",activiteController.deleteCreneau)

/**
 * @swagger
 * /activite/deleteCreneau:
 *   patch:
 *     tags: [Activite]
 *     summary: delete a creneau by its id
 *     requestBody :
 *       required : true
 *       content :
 *         application/json :
 *           schema :
 *             type : object
 *             required :
 *               - id
 *             properties :
 *               id :
 *                 type : integer
 *                 example : 1
 *                 description : "L'identifiant de l'activite à supprimer."
 *     responses:
 *       200:
 *         description: Creneau successfully deleted
 *       500:
 *         description: Internal error
 */

router.post("/creerCreneau",activiteController.createCreneau)


/**
 * @swagger
 * /activite/creerCreneau:
 *   post:
 *     tags: [Activite]
 *     summary: Create a new creneau
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCreneau'
 *     responses:
 *       200:
 *         description: Creneau successfully created
 *       500:
 *         description: Internal error
 */


router.get("/reservations", activiteController.getReservationsById);

/**
 * @swagger
 * /activite/reservations:
 *   get:
 *     tags: [Activite]
 *     summary: Get all reservations of an activite
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the activite
 *     responses:
 *       200:
 *         description: A list of reservation
 *       500:
 *         description: Internal error
 */

router.get("/updateVue", activiteController.updateVueActivite);

/**
 * @swagger
 * /activite/updateVue:
 *   get:
 *     tags: [Activite]
 *     summary: Get all reservations of an activite
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the activite
 *     responses:
 *       200:
 *         description: A list of reservation
 *       500:
 *         description: Internal error
 */


module.exports = router;