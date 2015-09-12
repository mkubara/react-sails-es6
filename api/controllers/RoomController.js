/* globals sails, Room */

/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

module.exports = {
	top: function(req, res) {
		sails.log.verbose('RoomController.top');
		sails.log.verbose('params ' + JSON.stringify(req.allParams()));

		Room.find().then(function(rooms) {
			res.view('homepage', {rooms: rooms});
		}).catch(function(error) {
			res.send(500, error);
		});
	},

	findOne: function(req, res) {
		sails.log.verbose('RoomController.findOne');
		sails.log.verbose('params ' + JSON.stringify(req.allParams()));

		var id = req.param('id');

		Room.findOne(id).then(function(room){
			res.send(room);
		}).catch(function(error) {
			res.send(500, error);
		});
	},

	create: function(req ,res) {
		sails.log.verbose('RoomController.create');
		sails.log.verbose('params ' + JSON.stringify(req.allParams()));

		var params = req.allParams();

		Room.create(params).then(function (room) {
			res.send(room);
		}).catch(function(error) {
			res.send(500, error);
		});
	}
};
