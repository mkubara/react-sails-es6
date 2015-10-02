'use strict';

import React from 'react';



export default class RoomPane extends React.Component {
  render () {
    return (
      <div id="sidebar">
        <h2>Rooms ({this.props.rooms.length})</h2>
        <RoomList {...this.props} />

        {/* RoomFormを作成、イベントハンドラも渡す */}
        <RoomForm {...this.props} />
      </div>
    )
  }
}


class RoomList extends React.Component {
  render () {
    const roomNodes = this.props.rooms.map((room) => {
      return ( <Room key={room.id} {...room} onRoomChange={this.props.onRoomChange} /> );
    });

    return (
      <ul id="roomList">
        {roomNodes}
      </ul>
    )
  }
}


class Room extends React.Component {
  _handleClick(e) {
    this.props.onRoomChange(this.props.name);
  }

  render () {
    // クリック時にルーム変更イベントを発行
    return (
      <li>
        <p onClick={this._handleClick.bind(this)}>{this.props.name}</p>
      </li>
    )
  }
}


class RoomForm extends React.Component {
  // クリックイベントを拾って、親のイベントハンドラを呼び出す
  _handleClick(e) {
    // propsで受け取ったハンドラを呼び出す。
    // 入力したテキストは、DOMNodeから拾い上げる
    this.props.onAddRoom(this.refs.inputText.getDOMNode().value);
  }

  // 例によって .bind(this) を忘れないこと！
  render () {
    return (
      <div id="roomForm">
        <h3>Create Room</h3>
        <input type="text" ref="inputText"></input>
        <button onClick={this._handleClick.bind(this)}>Create</button>
      </div>
    )
  }
}
