'use strict';

import React from 'react';

export default class RoomPane extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div id="sidebar">
        <h2>Rooms ({this.props.rooms.length})</h2>
        <RoomList rooms={this.props.rooms} onRoomChange={this.props.onRoomChange} />

        {/* RoomFormを作成、イベントハンドラも渡す */}
        <RoomForm onAddRoom={this.props.onAddRoom} />
      </div>
    )
  }
}


class RoomList extends React.Component {
  constructor() {
    super();
  }

  render () {
    // RoomListで表示するRoom要素は、render関数内で動的に作成する。
    // propsのArrayはmap関数でイテレーションでき、全変換結果を変数として受け取れる
    const roomNodes = this.props.rooms.map((room) => {
      // key要素を設定すると、再描画をより正確に制御できる（無駄な再描画を抑止できる）
      return ( <Room key={room.id} name={room.name} /> );
    });

    // 全変換結果をリスト要素としてレンダリングすれば良い
    return (
      <ul>
        {roomNodes}
      </ul>
    )
  }
}


class Room extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <li>
        <p>{this.props.name}</p>
      </li>
    )
  }
}


class RoomForm extends React.Component {
  constructor() {
    super();
  }

  // クリックイベントを拾って、親のイベントハンドラを呼び出す
  _handleClick(e) {
    // propsで受け取ったハンドラを呼び出す。
    // 入力したテキストは、DOMNodeから拾い上げる
    this.props.onAddRoom(this.refs.inputText.getDOMNode().value);
  }

  // 例によって .bind(this) を忘れないこと！
  render () {
    return (
      <div>
        <h3>Create Room</h3>
        <input type="text" ref="inputText"></input>
        <button onClick={this._handleClick.bind(this)}>Create</button>
      </div>
    )
  }
}
