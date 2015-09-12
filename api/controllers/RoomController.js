/* globals sails, Room */

/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

class RoomController {

	top(req, res) {
		sails.log.verbose('RoomController.top');
		sails.log.verbose(`params ${JSON.stringify(req.allParams())}`);

		Room.find().then((rooms) => {
			res.view('homepage', {rooms: rooms});
		}).catch((error) => {
			res.send(500, error);
		});
	}

	findOne(req, res) {
		sails.log.verbose('RoomController.findOne');
		sails.log.verbose(`params ${JSON.stringify(req.allParams())}`);

		const id = req.param('id');

		Room.findOne(id).then((room) => {
			res.send(room);
		}).catch((error) => {
			res.send(500, error);
		});
	}

	create(req, res) {
		sails.log.verbose('RoomController.create');
		sails.log.verbose(`params ${JSON.stringify(req.allParams())}`);

		const params = req.allParams();

		Room.create(params).then((room) => {
			res.send(room);
		}).catch((error) => {
			res.send(500, error);
		});
	}
}

module.exports = new RoomController();
