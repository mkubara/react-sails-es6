'use strict';

import React from 'react';



export default class MessagePane extends React.Component {
  render () {
    if (!this.props.room) {
      return (
        <div id="thread">
        </div>
      );
    } else {
      return (
        <div id="thread">
          <h1>Room [{this.props.room.name}]</h1>
          <MessageList {...this.props.room}></MessageList>
          <MessageForm {...this.props} />
        </div>
      );
    }
  }
}



class MessageList extends React.Component {
  render () {
    if (!this.props.messages || !this.props.messages.length) {
      return (
        <div></div>
      );
    } else {
      var messageNodes = this.props.messages.map((message)=> {
        return ( <Message key={message.id} {...message} /> );
      });

      return (
        <div>
          <h2>MessageList</h2>
          <ul>
            {messageNodes}
          </ul>
        </div>
      );
    }
  }
}



class Message extends React.Component {
  render () {
    return (
      <li>
        <p>{this.props.content}</p>
      </li>
    )
  }
}



class MessageForm extends React.Component {
  _handleClick(e) {
    this.props.onAddMessage(this.refs.inputText.getDOMNode().value);
  }

  render () {
    return (
      <div>
        <input type="text" ref="inputText"></input>
        <button onClick={this._handleClick.bind(this)}>Message</button>
      </div>
    )
  }
}
