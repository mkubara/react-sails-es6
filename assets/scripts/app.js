/* globals alert */

'use strct';

import $ from 'jquery';

$(function() {
  const $roomInputForm = $('#roomInputForm');
  const $roomInputButton = $('#roomInputButton');
  const $roomName = $('#roomName');
  const $messageList = $('#messageList');
  const $messageInputForm = $('#messageInputForm');
  const $messageInputButton = $('#messageInputButton');

  const addMessages = function(messages) {
    messages = Array.isArray(messages) ? messages : [messages];

    messages.forEach((message) => {
      $messageList.append(`<li>${message.content}</li>`);
    });
  };

  let currentRoom;

  $roomInputButton.on('click', () => {
    const name = $roomInputForm.val();

    $.ajax({
      method: 'POST',
      url: '/room',
      data: {
        name: name
      }
    }).done((room) => {
      // TODO リストに追加
      console.log(room);
    }).fail((error) => {
      alert(error);
      console.error(error);
    });
  });

  $('#roomList li').on('click', (e) => {
    var name = $(e.target).text();

    $roomName.text(`IN ${name}`);
    $messageList.empty();

    $.ajax({
      method: 'GET',
      url: `/message?room=${name}`
    }).done((messages) => {
      currentRoom = name;
      addMessages(messages);
    }).fail((error) => {
      alert(error);
      console.error(error);
    });
  });

  $messageInputButton.on('click', () => {
    const content = $messageInputForm.val();

    $.ajax({
      method: 'POST',
      url: '/message',
      data: {
        content: content,
        room: currentRoom
      }
    }).done((message) => {
      addMessages(message);
    }).fail((error) => {
      alert(error);
      console.error(error);
    });
  });
});
