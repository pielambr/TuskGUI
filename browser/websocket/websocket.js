var constants = require('../../app/constants');

var websocket = {
  init: function() {
    this.listeners = [];
    this.ws = new Websocket(constants.TUSK_WS);
    this.ws.onmessage = this.fireEvent;
    this.ws.onclose = function() {
      
    }
  },
  addListener: function(listener) {
    this.listeners.push(listener);
  },
  fireEvent: function(event) {
    var ev = JSON.parse(event);
    for(var l in this.listeners) {
      l.notify(ev);
    }
  },
  removeListener: function(listener) {
    var id = this.listeners.indexOf(listener);
    if(id !== -1) {
      this.listeners.splice(id, 1);
    }
  }
};
