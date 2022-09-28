/**
 |----------------------------------------------
 | Login Controller
 |----------------------------------------------
 | Holds all of the
 | user login.
 |----------------------------------------------
 */
const bcrypt = require('bcryptjs');
const callbacks = require('../helpers');
const jwt = require('jsonwebtoken');
const User = require('../database/models').User;
const Sequelize = require('sequelize');

require('dotenv').config();
let secret = process.env.SECRET;

class AuthController {
  /**
   * Login user
   */
  static loginUser(req, res) {
    try {
      let email = req.body.email.toLowerCase();
      let password = req.body.password;
      password = password.replace(/\s/g, '');

      User.findOne({
        where: { email: email }
      }).then(async user => {
        if (!user) {
          return res.status(401).json({ message: "Invalid Credentials." });
        }

        let passwordIsValid = bcrypt.compareSync(password, user.password.trim());
        if (passwordIsValid) {
          // get admin details
          let userDetails = {
            id: user.id,
            fullname: user.firstname + ' ' + user.lastname,
            email: user.email,
            is_auth: 'admin'
          };

          let token = jwt.sign({
            user: userDetails
          }, secret, {
            expiresIn: '1d'
          });

          return res.status(200).json({
            error: false,
            user: userDetails,
            token: token
          });
        } else {
          return res.status(203).json({
            error: true,
            message: 'Invalid Credentials.'
          });
        }
      }).catch(e => {
        return res.sendStatus(500);
      });
    } catch (e) {
      return res.sendStatus(500);
    }
  }
}

module.exports = AuthController;