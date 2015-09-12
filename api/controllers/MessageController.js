/* globals Message */

/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

class MessageController {

	find(req, res) {
		const room = req.param('room');

		Message.find({room: room}).then((messages) => {
			res.send(messages);
		}).catch((error) => {
			res.send(500, error);
		});
	}

	create(req, res) {
		const params = req.allParams();

		Message.create(params).then((message) => {
			res.send(message);
		}).catch((error) => {
			res.send(500, error);
		});
	}
}

module.exports = new MessageController();
