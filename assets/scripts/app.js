/* globals alert */

'use strct';

var $ = require('jquery');

$(function() {
  var $roomInputForm = $('#roomInputForm');
  var $roomInputButton = $('#roomInputButton');
  var $roomName = $('#roomName');
  var $messageList = $('#messageList');
  var $messageInputForm = $('#messageInputForm');
  var $messageInputButton = $('#messageInputButton');

  var addMessages = function(messages) {
    messages = Array.isArray(messages) ? messages : [messages];

    messages.forEach(function(message) {
      $messageList.append('<li>' + message.content + '</li>');
    });
  };

  var currentRoom;

  $roomInputButton.on('click', function() {
    var name = $roomInputForm.val();

    $.ajax({
      method: 'POST',
      url: '/room',
      data: {
        name: name
      }
    }).done(function(room) {
      // TODO リストに追加
      console.log(room);
    }).fail(function(error) {
      alert(error);
      console.error(error);
    });
  });

  $('#roomList li').on('click', function(e) {
    var name = $(this).text();

    $roomName.text('IN ' + name);
    $messageList.empty();

    $.ajax({
      method: 'GET',
      url: `/message?room=${name}`
    }).done(function(messages) {
      currentRoom = name;
      addMessages(messages);
    }).fail(function(error){
      alert(error);
      console.error(error);
    });
  });

  $messageInputButton.on('click', function() {
    var content = $messageInputForm.val();

    $.ajax({
      method: 'POST',
      url: '/message',
      data: {
        content: content,
        room: currentRoom
      }
    }).done(function(message) {
      addMessages(message);
    }).fail(function(error) {
      alert(error);
      console.error(error);
    });
  });
});
