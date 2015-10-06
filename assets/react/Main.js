'use strict';

import React from 'react';
import RoomPane from './RoomPane';
import MessagePane from './MessagePane';

import _ from 'lodash';
import Promise from 'bluebird';
import agent from 'superagent-bluebird-promise';


function _createRoom(roomName) {
  console.log(`Main::_createRoom(${roomName})`);

  return new Promise((resolve, reject) => {
    agent.post('/room')
    .send({name: roomName})
    .set('Accept', 'application/json')
    .then((res) => {
      resolve(res.body);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


function _fetchRoom() {
  console.log(`Main::_fetchRoom()`);

  return new Promise(function(resolve, reject) {
    agent.get('/room')
    .set('Accept', 'application/json')
    .then((res) => {
      resolve(res.body);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


function _createMessage(message, roomId) {
  console.log(`Main::_createMessage(${message}, ${roomId})`);

  return new Promise((resolve, reject) => {
    agent.post(`/message`)
    .send({content: message, room: roomId})
    .set('Accept', 'application/json')
    .then((res) => {
      resolve(res.body);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


function _fetchMessage(roomId) {
  console.log(`Main::_fetchMessage(${roomId})`);

  return new Promise(function(resolve, reject) {
    agent.get(`/message?room=${roomId}`)
    .set('Accept', 'application/json')
    .then((res) => {
      resolve(res.body);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


const _testData = {
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



export default class Main extends React.Component {
  constructor(props) {
  	super(props);
    console.log('Main.constructor');
    console.log(props);

    this.state = {
      rooms: [],
      currentRoom: null
    }
/*
    this.state = _testData;
    this.state.currentRoom = this.state.rooms[0];
*/
    if (this.props.data) {
      console.log('server-side rendering');

      this.state = {
        rooms: this.props.data.rooms,
        currentRoom: this.props.data.currentRoom
      };
    } else if (this.props.rooms) {
      console.log('client-side rerendering');

      this.state = {
        rooms: this.props.rooms,
        currentRoom: this.props.currentRoom
      };
    } else {
      console.log('invalid data');
    }

    console.log(this.state);
  }


  componentWillMount() {
    console.log('componentWillMount');
  }


  _changeRoom(roomId) {
    console.log(`Main._changeRoom: ${roomId}`);

    _fetchMessage(roomId).then((messages) => {
      console.log(messages);

      // ルームを変更し、メッセージをFetchしたものに置き換える
      const newState = _.assign({}, this.state);
      newState.currentRoom = _.find(newState.rooms, (room) => {
        return room.id === roomId;
      });
      newState.currentRoom.messages = messages;

      this.setState(newState);
    })
    .catch((err) => {
      console.error(err);
    });
  }


  _addRoom(roomName) {
    console.log(`Main._addRoom: ${roomName}`);

    _createRoom(roomName).then((room) => {
      console.log(room);

      // ルームを追加
      const newRooms = _.cloneDeep(this.state.rooms);
      newRooms.push(room);

      this.setState({ rooms: newRooms });
    })
    .catch((err) => {
      console.error(err);
    });
  }


  _addMessage(content) {
    console.log(`Main._addMessage: ${content}`);

    _createMessage(content, this.state.currentRoom.id).then((message) => {
      console.log(message);

      // 現在のルームにメッセージを追加
      const newState = _.assign({}, this.state);
      newState.currentRoom.messages.push(message);

      this.setState(newState);
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
