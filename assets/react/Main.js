'use strict';

import React from 'react';
import RoomPane from './RoomPane';
import MessagePane from './MessagePane';

import _ from 'lodash';
import assign from 'object-assign';
import Promise from 'bluebird';
import agent from 'superagent-bluebird-promise';


function _createRoom(roomName) {
  return new Promise((resolve, reject) => {
    agent.post('/room')
    .send({name: roomName})
    .set('Accept', 'application/json')
    .then((res) => {
      console.log(res.body);
      resolve(res.body);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


function _createMessage(message, roomId) {
  return new Promise((resolve, reject) => {
    agent.post(`/message`)
    .send({content: message, room: roomId})
    .set('Accept', 'application/json')
    .then((res) => {
      console.log(res.body);
      resolve(res.body);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


export default class Main extends React.Component {
  constructor() {
  	super();
/*
    this.state = {
      rooms: [{
        id: 1,
        name: 'room1',
        messages: [
          {id: 1, message: 'asdf'},
          {id: 2, message: 'zxv'}
        ]
      },{
        id: 2,
        name: 'room2',
        messages: [
          {id: 1, message: 'qwer'},
          {id: 2, message: 'tyuuuu'}
        ]
      }],
      currentRoom: null
    };
    this.state.currentRoom = this.state.rooms[0];
*/
    this.state = {
      rooms: [],
      currentRoom: null
    };
  }


  componentWillMount() {
    console.log('componentWillMount');

    agent.get('/room')
    .set('Accept', 'application/json')
    .then((res) => {
      console.log(res.body);

      const newRooms = _.cloneDeep(res.body);

      this.setState({
        rooms: newRooms,
        currentRoom: newRooms.length ? newRooms[0] : null
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }


  _changeRoom(roomId) {
    console.log(`changeRoom: ${roomId}`);

    const selectedRoom = _.find(this.state.rooms, (room) => {
      return room.id === roomId;
    });
    if (!selectedRoom) {
      return;
    }

    agent.get(`/message?room=${selectedRoom.id}`)
    .set('Accept', 'application/json')
    .then((res) => {
      console.log(res.body);

      // Stateの更新
      const newState = _.cloneDeep(this.state);
      newState.currentRoom = _.find(newState.rooms, (room) => {
        return room.id === roomId;
      });
      newState.currentRoom.messages = res.body;

      this.setState(newState);
    })
    .catch((err) => {
      console.error(err);
    });
  }


  _addRoom(roomName) {
    console.log(`addRoom: ${roomName}`);

    _createRoom(roomName).then((room) => {
      // Stateの更新
      const newRooms = _.cloneDeep(this.state.rooms);
      newRooms.push(room);

      this.setState({ rooms: newRooms });
    })
    .catch((err) => {
      console.error(err);
    });
  }


  _addMessage(content) {
    console.log(`addMessage: ${content}`);

    _createMessage(content, this.state.currentRoom.id).then((message) => {
      // Stateの更新
      const newRooms = _.cloneDeep(this.state.rooms);
      const newRoomSelected = _.find(newRooms, (room) => {
        return room.id === this.state.currentRoom.id;
      });
      newRoomSelected.messages.push(message);

      this.setState({
        rooms: newRooms,
        currentRoom: newRoomSelected
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }


  render() {
    return (
      <div id="page">
        <RoomPane rooms={this.state.rooms} onRoomChange={this._changeRoom.bind(this)} onAddRoom={this._addRoom.bind(this)} />
        <MessagePane room={this.state.currentRoom} onAddMessage={this._addMessage.bind(this)} />
      </div>
    )
  }
}
