'use strict';

import React from 'react';



export default class CommentPane extends React.Component {
  constructor() {
    super();
  }

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
          <CommentList messages={this.props.room.comments}></CommentList>
          <CommentForm onComment={this.props.onComment} />
        </div>
      );
    }
  }
}



class CommentList extends React.Component {
  constructor() {
    super();
  }

  render () {
    if (!this.props.messages || !this.props.messages.length) {
      return (
        <div></div>
      );
    } else {
      var commentNodes = this.props.messages.map((comment)=> {
        return ( <Comment key={comment.id} comment={comment} /> );
      });

      return (
        <div>
          <h2>CommentList</h2>
          <ul>
            {commentNodes}
          </ul>
        </div>
      );
    }
  }
}



class Comment extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <li>
        <p>{this.props.comment.content}</p>
      </li>
    )
  }
}



class CommentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    this.props.onComment(this.refs.inputText.getDOMNode().value);
  }

  render () {
    return (
      <div>
        <input type="text" ref="inputText"></input>
        <button onClick={this.handleClick.bind(this)}>Comment</button>
      </div>
    )
  }
}
