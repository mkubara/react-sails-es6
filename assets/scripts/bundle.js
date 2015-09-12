/* globals alert */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

'use strct';

var $roomInputForm = (0, _jquery2['default'])('#roomInputForm');
var $roomInputButton = (0, _jquery2['default'])('#roomInputButton');
var $roomName = (0, _jquery2['default'])('#roomName');
var $messageList = (0, _jquery2['default'])('#messageList');
var $messageInputForm = (0, _jquery2['default'])('#messageInputForm');
var $messageInputButton = (0, _jquery2['default'])('#messageInputButton');

var addMessages = function addMessages(messages) {
  messages = Array.isArray(messages) ? messages : [messages];

  messages.forEach(function (message) {
    $messageList.append('<li>' + message.content + '</li>');
  });
};

var currentRoom = undefined;

$roomInputButton.on('click', function () {
  var name = $roomInputForm.val();

  _jquery2['default'].ajax({
    method: 'POST',
    url: '/room',
    data: {
      name: name
    }
  }).done(function (room) {
    // TODO リストに追加
    console.log(room);
  }).fail(function (error) {
    alert(error);
    console.error(error);
  });
});

(0, _jquery2['default'])('#roomList li').on('click', function (e) {
  var name = (0, _jquery2['default'])(e.target).text();

  $roomName.text('IN ' + name);
  $messageList.empty();

  _jquery2['default'].ajax({
    method: 'GET',
    url: '/message?room=' + name
  }).done(function (messages) {
    currentRoom = name;
    addMessages(messages);
  }).fail(function (error) {
    alert(error);
    console.error(error);
  });
});

$messageInputButton.on('click', function () {
  var content = $messageInputForm.val();

  _jquery2['default'].ajax({
    method: 'POST',
    url: '/message',
    data: {
      content: content,
      room: currentRoom
    }
  }).done(function (message) {
    addMessages(message);
  }).fail(function (error) {
    alert(error);
    console.error(error);
  });
});
