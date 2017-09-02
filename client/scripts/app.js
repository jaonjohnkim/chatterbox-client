class App { // if subclass, need 'extends Superclass'
  constructor () {
    // if subclass, we need super();
    // define properties
    // format: this.propertyName = property;
    // this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
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
      data: JSON.stringify(message),
      contentType: 'application/json', //This might be the reason for JSON stringify
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  fetch () {
    var constraints = 'order="-createdAt"';
    // var constraints = 'limit=50';
    $.ajax({
      url: this.server, // + '?' + constraints,
      type: 'GET',
      contentType: 'application/json', //POST request not GET
      // data: 'where={"post":{"__type":"Pointer","username":"John"}}'
      data: {limit: 500, order: '-createdAt', },
      // data: 'limit=10',
      success: function (data) {
        console.log('chatterbox: Data fetched: ', data);
        console.log(data);
        var filtered = _.filter(data.results, (value) => {
          return value.username === 'Kenny';
        });
        console.log(filtered); 
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
        $('#chats').children().remove();
        console.log('Removed messages');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to delete message', data);
      }
    });
    
  }
  renderMessage(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        console.log('chatterbox: message rendered');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to render message', data);
      }
    });
    
    var userName = $('<a />').attr('class', 'username').html(message.username);
    var roomName = $('<span />').attr('class', 'roomname').html(message.roomname);
    var text = $('<div />').attr('class', 'text').html(message.text);
    var header = $('<div />').append(userName).append('@').append(roomName).append(' : ').append(text);
    header.appendTo($('#chats'));
    

  }
  renderRoom(name) {
    $.ajax({
      url: this.server,
      type: 'PUT', //Update
      data: JSON.stringify(name),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to delete message', data);
      }
    });
    var option = document.createElement('option');
    option.text = name;
    var room = document.getElementById('roomSelect');
    var newRoom = room.add(option);
  }
  handleUsernameClick() {
    $.ajax({
      url: this.server,
      type: 'PUT', //update object
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to delete message', data);
      }
    });
    console.log(this);
  }
  handleSubmit() {
    var inputMsg = $('#message').val();
    // console.log(inputMsg);
  }  
}


var app = new App();
var message1 = {
  username: 'John Kim',
  text: 'I like to beatbox',
  roomname: 'lobby'
};
// app.send(message1);
app.fetch();
// app.renderMessage(message1);






