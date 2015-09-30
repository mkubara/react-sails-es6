'use strict';

import React from 'react';
import RoomPane from '../react/RoomPane';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div id="page">
        {/* 子コンポーネントを表示 */}
        <RoomPane />
      </div>
    )
  }
}
