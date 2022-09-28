/**
|----------------------------------
| Basic Api Route
|----------------------------------
*/

const express = require("express");
const router = express.Router();
const BasicController = require('./../controllers/BasicController');
const authGuard = require('../middlewares/authguard');

/**
 * @swagger
 * /api/places:
 *   get:
 *     tags:
 *       - Basic
 *     name: Fetch places
 *     summary: Fetch all places
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Ok
 *       '203':
 *         description: Error
 *       '500':
 *         description: Internal server error
 */
// Fetch all places
router.get('/places', BasicController.fetchPlaces);

module.exports = router;