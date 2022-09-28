/**
 |----------------------------------------------
 | Basic Controller
 |----------------------------------------------
 | Controller for all client activities
 |----------------------------------------------
 */
const callbacks = require('../helpers');
const Place = require('../database/models').Place;
const Sequelize = require('sequelize');

class BasicController {
  /**
   * Fetch all places
   */
  static fetchPlaces(req, res) {
    try {
      // Get all places
      Place.findAll({}).then(places => {
        if (places.length) {
          return res.status(200).json({ error: false, data: places });
        }

        return res.status(200).json({ error: false, data: [] });
      }).catch((err) => res.status(203).json({ error: true, message: 'Unable to fetch places. Try again later!' }));
    } catch (err) {
      console.log(err.message)
    }
  }
}

module.exports = BasicController;