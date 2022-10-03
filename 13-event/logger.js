const EventEmitter = require('events');

/*
EventEmitter는 한번 객체를 만들면
그 객체내에서 발생하는 이벤트에 한해서!!!
들을수있다
*/

class Logger extends EventEmitter {
  log(callback) {
    this.emit('log', 'started...');
    callback();
    this.emit('log', 'ended!');
  }
}
module.exports.Logger = Logger;
