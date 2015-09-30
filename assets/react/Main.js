'use strict';

import React from 'react';
import RoomPane from './RoomPane';
import CommentPane from './CommentPane';
import _ from 'lodash';



export default class Main extends React.Component {
  constructor() {
  	super();
    this.state = {
      rooms: [{
        id: 1,
        name: 'room1',
        comments: [
          {id: 1, message: 'asdf'},
          {id: 2, message: 'zxv'}
        ]
      },{
        id: 2,
        name: 'room2',
        comments: [
          {id: 1, message: 'qwer'},
          {id: 2, message: 'tyuuuu'}
        ]
      }],
      currentRoom: null
    };
    this.state.currentRoom = this.state.rooms[0];
  }

  _changeRoom(roomName) {
    console.log(`changeRoom: ${roomName}`);

    const newRoom = _.find(this.state.rooms, (room) => {
      return room.name === roomName;
    });

    if (newRoom) {
      this.setState({currentRoom: newRoom});
    }
  }


  _addRoom(roomName) {
    console.log(`addRoom: ${roomName}`);

    const newRooms = [].concat(this.state.rooms);

    newRooms.push({
      id: newRooms.length + 1,
      name: roomName,
      comments: []
    });

    this.setState({
      rooms: newRooms
    });
  }

  _addComment(message) {
    console.log(`addComment: ${message}`);

    const newRooms = [].concat(this.state.rooms);
    const newRoomSelected = _.find(newRooms, (room) => {
      return room.name === this.state.currentRoom.name;
    });

    newRoomSelected.comments.push({
      id: newRoomSelected.comments.length + 1,
      message: message
    });

    this.setState({
      rooms: newRooms
    });
  }

  render() {
    return (
      <div id="page">
        <RoomPane rooms={this.state.rooms} onRoomChange={this._changeRoom.bind(this)} onAddRoom={this._addRoom.bind(this)} />
        <CommentPane room={this.state.currentRoom} onComment={this._addComment.bind(this)} />
      </div>
    )
  }
}
