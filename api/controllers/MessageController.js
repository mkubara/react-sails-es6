/* globals Message, sails */

/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

module.exports = {
	find: function(req, res) {
		sails.log.verbose('MessageController.find');
		sails.log.verbose('params ' + JSON.stringify(req.allParams()));

		var room = req.param('room');

		Message.find({room: room}).then(function(messages) {
			res.send(messages);
		}).catch(function(error) {
			res.send(500, error);
		});
	},

	create: function(req, res) {
		sails.log.verbose('MessageController.create');
		sails.log.verbose('params ' + JSON.stringify(req.allParams()));

		var params = req.allParams();

		Message.create(params).then(function(message) {
			res.send(message);
		}).catch(function(error) {
			res.send(500, error);
		});
	}
};
