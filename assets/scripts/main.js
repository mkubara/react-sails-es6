'use strict';

import React from 'react';
import RoomPane from '../react/RoomPane';

export default class Main extends React.Component {
  constructor() {
    super();

    // Stateを初期化
    this.state = {
      rooms: [{
        id: 1,
        name: 'room1',
        comments: []
      }, {
        id: 2,
        name: 'room2',
        comments: []
      }]
    };
  }

  // 新しいRoomを作成し追加する
  // 子からの通知を受け取り、自身のStateを書き換えるハンドラ
  _addRoom(roomName) {
    console.log(`addRoom: ${roomName}`);

    // NOTE:
    // Stateは、this.setState({...}); で変更しなければならない
    // つまりStateは「差し替え」での変更しかできないと考えたほうが良い。
    // 差し替え後の要素として、旧要素を複製する
    const newRooms = [].concat(this.state.rooms);

    // 複製要素に、新しいRoom要素を追加
    newRooms.push({
      id: newRooms.length + 1,
      name: roomName,
      comments: []
    });

    // 複製した要素で、現在のStateを差し替える。
    // 変更したStateは、すべての子要素に自動的に通知される
    this.setState({
      rooms: newRooms
    });
  }

  render () {
    return (
      <div id="page">
        {/* イベントハンドラを子へ渡す、必ず .bind(this) すること！ */}
        <RoomPane rooms={this.state.rooms} onAddRoom={this._addRoom.bind(this)} />
      </div>
    )
  }
}
