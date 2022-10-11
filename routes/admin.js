/**
|----------------------------------
| Basic Api Route
|----------------------------------
*/

const express = require("express");
const router = express.Router();
const AdminController = require('./../controllers/AdminController');
const authGuard = require('./../middlewares/authguard');

/**
 * @swagger
 * /api/admin/places:
 *   get:
 *     tags:
 *       - Admin Activities
 *     name: Get all places
 *     summary: Get all places registered
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Ok
 *       '401':
 *         description: Access denied
 *       '500':
 *         description: Internal server error
 */
// Get places
router.get('/admin/places', authGuard, AdminController.places);

/**
 * @swagger
 * /api/admin/places/create:
 *   post:
 *     tags:
 *       - Admin Activities
 *     name: Store place
 *     summary: Add new place
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             place:
 *               type: string
 *             address:
 *               type: string
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         required:
 *           - place
 *           - address
 *           - latitutde
 *           - longitude
 *     responses:
 *       '201':
 *         description: Ok
 *       '203':
 *         description: Error
 *       '401':
 *         description: Access denied
 *       '500':
 *         description: Internal server error
 */
// Get places
router.post('/admin/places/create', authGuard, AdminController.storePlace);

/**
 * @swagger
 * /api/admin/places/edit/{id}:
 *   get:
 *     tags:
 *       - Admin Activities
 *     name: Edit place
 *     summary: Fetch place details for editing
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer|string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: Ok
 *       '203':
 *         description: Error
 *       '401':
 *         description: Access denied
 *       '500':
 *         description: Internal server error
 */
// Edit place
router.get('/admin/places/edit/:id', authGuard, AdminController.editPlace);

/**
 * @swagger
 * /api/admin/places/update/{id}:
 *   put:
 *     tags:
 *       - Admin Activities
 *     name: Update place
 *     summary: Update existing place record
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer|string
 *         required:
 *           - id
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             place:
 *               type: string
 *             address:
 *               type: string
 *             longitude:
 *               type: number
 *             latitude:
 *               type: number
 *         required:
 *           - place
 *           - address
 *           - longitude
 *           - latitude
 *     responses:
 *       '202':
 *         description: Ok
 *       '203':
 *         description: Error
 *       '401':
 *         description: Access denied
 *       '500':
 *         description: Internal server error
 */
// Edit place
router.put('/admin/places/update/:id', authGuard, AdminController.updatePlace);

/**
 * @swagger
 * /api/admin/places/delete/{id}:
 *   delete:
 *     tags:
 *       - Admin Activities
 *     name: Delete place
 *     summary: Delete place
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer|string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: Ok
 *       '203':
 *         description: Error
 *       '401':
 *         description: Access denied
 *       '500':
 *         description: Internal server error
 */
// Get places
router.delete('/admin/places/delete/:id', authGuard, AdminController.deletePlace);

module.exports = router;