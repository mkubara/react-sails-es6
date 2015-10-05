'use strict';

import React from 'react';
import Main from '../../assets/react/main'


// ごく簡単なViewを作成
class ViewController {
  react(req, res) {
    // API
    Room.find().populate('messages').then((rooms) => {
      const initialData = {
        rooms: rooms,
        currentRoom: rooms.length ? rooms[0] : null
      };

      // View
      const markup = React.renderToString( React.createElement(
        Main, {
          data: initialData
        }
      ));

      sails.log.verbose(markup);
      sails.log.verbose(initialData);

      // render
      res.view('react', {
        markup: markup,
        initialData: JSON.stringify(initialData)
      });
		}).catch((error) => {
      sails.log.error(error);

			res.send(500, error);
		});
  }
}

module.exports = new ViewController;
