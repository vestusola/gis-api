/**
 |----------------------------------------------
 | Administrator Controller
 |----------------------------------------------
 | Holds all of the administrator's operations
 |----------------------------------------------
 */
const bcrypt = require('bcryptjs');
const callbacks = require('../helpers');
const jwt = require('jsonwebtoken');
const Place = require('../database/models').Place;
const Sequelize = require('sequelize');

require('dotenv').config();

class AdminController {
  /**
   * Get all places
   */
  static places(req, res) {
    try {
      // Check authentication
      var auth = req.decoded.user.is_auth;

      if (auth == 'admin') {
        // Get all places
        Place.findAll({}).then(places => {
          if (places.length) {
            return res.status(200).json({ error: false, data: places });
          } else {
            return res.status(200).json({ error: false, data: [] });
          }
        }).catch(() => {
          return res.status(203).json({ error: true, message: "Cannot fetch all places. Try again later." })
        });
      } else {
        return res.status(403).json({ error: true, message: "Unauthorized access" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * Store place
   */
  static async storePlace(req, res) {
    try {
      // Check authentication
      var auth = req.decoded.user.is_auth;

      if (auth == 'admin') {
        // Request data
        const { place, address, latitude, longitude } = req.body;

        // Check if place has already been registered
        var isPlaceRegistered = await Place.findOne({ where: { name: place }});
        if (isPlaceRegistered) return res.status(203).json({ error: true, message: 'Place has already been registered'});

        // Add new place
        Place.create({
          name: place,
          address: address,
          longitude: longitude,
          latitude: latitude
        }).then(created => {
          if (created) return res.status(201).json({ error: false, message: 'Place was successfully registered.'});

          return res.status(203).json({ error: true, message: 'Unable to store Place. Try again later.'});
        }).catch(err => res.status(400).json({ error: true, message: err.message }));
      } else {
        return res.status(403).json({ error: true, message: "Unauthorized access" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * Edit place
   */
  static async editPlace(req, res) {
    try {
      // Check authentication
      var auth = req.decoded.user.is_auth;

      if (auth == 'admin') {
        // Request data
        let placeId = req.params.id;

        let place = await Place.findByPk(placeId);
        if (place == null) return res.status(404).json({ error: true, message: 'Requested resources not found!'});

        return res.status(200).json({ error: false, data: place });
      } else {
        return res.status(403).json({ error: true, message: "Unauthorized access" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * Update place
   */
  static async updatePlace(req, res) {
    try {
      // Check authentication
      var auth = req.decoded.user.is_auth;

      if (auth == 'admin') {
        // Request data
        const { place, address, latitude, longitude } = req.body;
        const placeId = req.params.id;

        // Check if place has already been registered
        var isPlaceRegistered = await Place.findOne({ where: { name: place }});
        if (isPlaceRegistered && isPlaceRegistered.id != placeId) return res.status(203).json({ error: true, message: 'Place has already been registered'});

        // Update place
        Place.update({
          name: place,
          address: address,
          longitude: longitude,
          latitude: latitude
        }, {
          where: { id: placeId }
        }).then(updated => {
          if (updated) return res.status(202).json({ error: false, message: 'Place was successfully updated.'});

          return res.status(203).json({ error: true, message: 'Unable to update Place. Try again later.'});
        }).catch(err => res.status(400).json({ error: true, message: err.message }));
      } else {
        return res.status(403).json({ error: true, message: "Unauthorized access" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * Delete place
   */
  static async deletePlace(req, res) {
    try {
      // Check authentication
      var auth = req.decoded.user.is_auth;

      if (auth == 'admin') {
        // Request data
        let placeId = req.params.id;

        let place = await Place.findByPk(placeId);
        if (place == null) return res.status(404).json({ error: true, message: 'Requested resources not found!'});

        // Delete place
        Place.destroy({ where: { id: placeId }}).then(deleted => {
          if (deleted) return res.status(200).json({ error: false, message: 'Place has been deleted!'});

          return res.status(203).json({ error: true, message: 'Unable to delete Place. Try again later.'});
        }).catch(err => res.status(500).json({ error: true, message: err.message }));
      } else {
        return res.status(403).json({ error: true, message: "Unauthorized access" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

module.exports = AdminController;