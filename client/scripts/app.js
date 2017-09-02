class App { // if subclass, need 'extends Superclass'
  constructor () {
    // if subclass, we need super();
    // define properties
    // format: this.propertyName = property;
    // this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.server = 'http://parse.sfm6.hackreactor.com/';
    this.init();
  }
  
  // methodName () {
  //   this.value = newValue;  
  // }
  init () {


    $('#main .username').click(this.handleUsernameClick);
    $('#send .submit').submit(this.handleSubmit);
  }
  send (message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  fetch () {
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Data fetched');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch data', data);
      }
    });
  }
  clearMessages () {
    $.ajax({
      url: this.server,
      type: 'DELETE',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to delete message', data);
      }
    });
    $('#chats').children().remove();
  }
  renderMessage(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      contentType: 'application/json',
      success: function (data) {
        
        console.log('chatterbox: message rendered');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to render message', data);
      }
    });
    
    var userName = $('<span />').attr('class', 'username').html(message.username);
    var roomName = $('<span />').attr('class', 'roomname').html(message.roomname);
    var text = $('<div />').attr('class', 'text').html(message.text);
    var header = $('<div />').append(userName).append('@').append(roomName).append(' : ').append(text);
    header.appendTo($('#chats'));
    

  }
  renderRoom(name) {
    var option = document.createElement('option');
    option.text = name;
    var room = document.getElementById('roomSelect');
    var newRoom = room.add(option);
  }
  handleUsernameClick() {
    console.log(this);
  }
  handleSubmit() {
    console.log(this);
  }  
}


var app = new App();
