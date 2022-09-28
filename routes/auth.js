/**
|----------------------------------
| Basic Api Route
|----------------------------------
*/

const express = require("express");
const router = express.Router();
const AuthController = require('./../controllers/AuthController');
const authGuard = require('../middlewares/authguard');

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: user login
 *     summary: Login user
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
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: login successful
 *       '401':
 *         description: Access denied
 *       '500':
 *         description: Internl server error
 */
// login user
router.post('/login', AuthController.loginUser);

module.exports = router;