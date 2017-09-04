

class App {
  constructor () {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/';
    this.init();
  }
  init () {
    this.fetch();
  }
  defaultResponses (request) {
    // request.done((msg) => { console.log(msg); });
    // request.fail((msg) => { console.error(msg); });
  }
  fetch (user, room) {
    var count = 0;
    var context = this;
    var request = $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: {order: '-createdAt', limit: 150}
    });
    request.done((msg) => {
      _.each(msg.results, function ({objectId}) {
        context.delete(objectId);
      });
      // setTimeout(function() {
      //   context.fetch();
      // });
      // context.delete();
    });
  }
  send (message) {
    var request = $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
    this.defaultResponses(request);
    // request.done(function(msg) { console.log(msg); });
    // request.fail(function(msg) { console.error(msg); });

  }

  update (message) {
    var request = $.ajax({
      url: this.server + '5AT0bG6aE8',
      type: 'PUT',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
    this.defaultResponses(request);
  }
  
  delete (objId) {
    var request = $.ajax({
      url: this.server + objId,
      type: 'DELETE'
    });

    this.defaultResponses(request);
  }
}

var app = new App();

var newMsg = {
  username: 'John',
  roomname: 'lobby',
  text: 'Hello'
};

// app.send(newMsg);

// var updatedMsg = {
//   username: 'John',
//   text: 'Your identity has been stolen AGAIN'
// };

// app.update(updatedMsg);

// app.delete();
// app.fetch();