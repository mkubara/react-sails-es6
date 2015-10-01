'use strict';

import React from 'react';
import RoomPane from './RoomPane';
import MessagePane from './MessagePane';
import _ from 'lodash';
import agent from 'superagent';



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
      .end((err, res)=>
    {
      console.log(res.body);

      const newRooms = [].concat(res.body);

      this.setState({
        rooms: newRooms,
        currentRoom: newRooms.length ? newRooms[0] : null
      });
    });
  }


  _changeRoom(roomName) {
    console.log(`changeRoom: ${roomName}`);

    const selectedRoom = _.find(this.state.rooms, (room) => {
      return room.name === roomName;
    });
    if (!selectedRoom) {
      return;
    }

    agent.get(`/message?room=${selectedRoom.id}`)
      .set('Accept', 'application/json')
      .end((err, res)=>
    {
      console.log(res.body);

      // Stateの更新
      const newRooms = [].concat(this.state.rooms);
      const newRoomSelected = _.find(newRooms, (room) => {
        return room.name === roomName;
      });

      newRoomSelected.messages = [].concat(res.body);

      console.log(newRooms);

      this.setState({
        rooms: newRooms,
        currentRoom: newRoomSelected
      });
    });
  }


  _addRoom(roomName) {
    console.log(`addRoom: ${roomName}`);

    agent.post('/room')
      .send({name: roomName})
      .set('Accept', 'application/json')
      .end((err, res)=>
    {
      // Stateの更新
      const newRooms = [].concat(this.state.rooms);

      newRooms.push({
        id: newRooms.length + 1,
        name: roomName,
        messages: []
      });

      this.setState({
        rooms: newRooms
      });
    });
  }


  _addMessage(message) {
    console.log(`addMessage: ${message}`);

    agent.post(`/message`)
      .send({content: message, room: this.state.currentRoom.id})
      .set('Accept', 'application/json')
      .end((err, res)=>
    {
      // Stateの更新
      const newRooms = [].concat(this.state.rooms);
      const newRoomSelected = _.find(newRooms, (room) => {
        return room.name === this.state.currentRoom.name;
      });

      newRoomSelected.messages.push({
        id: newRoomSelected.messages.length + 1,
        content: message
      });

      this.setState({
        rooms: newRooms
      });
    });
  }


  render() {
    return (
      <div id="page">
        <RoomPane rooms={this.state.rooms} onRoomChange={this._changeRoom.bind(this)} onAddRoom={this._addRoom.bind(this)} />
        <MessagePane room={this.state.currentRoom} onMessage={this._addMessage.bind(this)} />
      </div>
    )
  }
}
