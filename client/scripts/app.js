class App { // if subclass, need 'extends Superclass'
  constructor () {
    // if subclass, we need super();
    // define properties
    // format: this.propertyName = property;
    // this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.init();
    // this.room = 'lobby';
    this.user;
  }
  
  // methodName () {
  //   this.value = newValue;  
  // }
  init () {
    
    $(document).ready(function () {
      $('#send .submit').on('click', function(event) {
        console.log('submit triggered 1st time');
        event.preventDefault();
        event.stopPropagation();
        app.handleSubmit();
      });
      $('#send #message').on('keydown', function (event) {
        if (event.which === 13 || event.keyCode === 13) {
          event.preventDefault();
          event.stopPropagation();
          app.handleSubmit();
        }
      });
      app.fetch();
      // setInterval(function() {
      //   app.clearMessages();
      //   app.fetch();
      // }, 5000);
      
    });
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

    var sendRequest = $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
    
    var sendRequest2 = sendRequest.done((msg) => { console.log(msg); })
    sendRequest2.done();
    sendRequest.fail(() => { console.log('Send failed'); });
    
  }

  fetch () {
    // var constraints = 'order="-createdAt"';
    // var constraints = 'limit=50';
    var userName = arguments[0];
    var roomName = arguments[1];
    var listOfConst = {};
    if (userName || userName !== '') {
      var userNameConstraint = {username: userName};
      _.extend(listOfConst, userNameConstraint);
    }
    if (roomName || roomName !== '') {
      var roomNameConstraint = {roomname: roomName};
      _.extend(listOfConst, roomNameConstraint);
    }
    var dateConstraint = {
      createdAt: {
        $gt: { 
          __type: 'Date', 
          iso: '2017-08-01T00:00:00.285Z'
        }
      }
    };
    _.extend(listOfConst, dateConstraint);

    var context = this;
    $.ajax({
      url: this.server, // + '?' + constraints,
      type: 'GET',
      contentType: 'application/json', //POST request not GET
      data: {limit: 500, order: '-createdAt', where: JSON.stringify(listOfConst)},
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          var oneChat = data.results[i];

          //check if oneChat has any scripts
          // if (no Scripts) {
          context.renderMessage(oneChat);
          // }
          console.log(data);
          // render rooms but check first if the same room exists
          var room = oneChat.roomname;
          var arrOfRooms = $('#roomSelect')[0].childNodes;
          var nameOfRooms = _.map(arrOfRooms, function(oneOption) {
            return oneOption.innerText;
          });
          if (!nameOfRooms.includes(room)) {
            context.renderRoom(room);
          }
        }
        $('.oneMessage').on('click', 'a', function(event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('username clicked');
          var user = $(this).text();
          app.clearMessages();
          app.fetch(user);
        });
        
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch data', data);
      }
    });
  }
  clearMessages () {
    $('#chats').empty();
  }
  renderMessage(message) {
    var user = message.username || 'anonymous';
    var room = message.roomname || 'lobby';
    var content = message.text || '';
    if (!(user.includes('<') || room.includes('<') || content.includes('<'))) {
      var userName = $('<a />').attr({'class': 'username', 'href': '#'}).html(message.username);
      var roomName = $('<span />').attr('class', 'roomname').html(message.roomname);
      var text = $('<span />').attr('class', 'text').html(message.text);
      var header = $('<div />').attr('class', 'oneMessage').append(userName).append(' @ ').append(roomName).append(' : ').append(text);
      header.appendTo($('div#chats'));
    }
  }

  renderRoom(name) {
    $('#roomSelect').append($('<option>', {
      value: name,
      text: name
    }));
  }
  handleUsernameClick() {
    app.fetch();
  }
  handleSubmit() {
    var inputMsg = $('#message').val();
    var name = window.location.search;
    name = decodeURIComponent(name.slice(name.lastIndexOf('=') + 1));
    var currentRoom = $('#roomSelect').val();
    var messageObj = {
      username: name,
      text: inputMsg,
      roomname: currentRoom
    };
    
    app.send(messageObj);
    app.clearMessages();
    $('#message').val('');
    app.fetch('', currentRoom);
  }
  changeRoom(option) {
    console.log('changing rooms');
    this.room = option;
    app.clearMessages();
    setTimeout(() => {
      app.fetch('', option);
    });
  }
}


var app = new App();


// setInterval(fetch) -> renderMessage
// renderMessage filters out the scripts


