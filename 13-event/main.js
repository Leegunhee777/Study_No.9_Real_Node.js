const logger = require('./logger.js');
const emitter = new logger.Logger();

emitter.on('log', event => {
  console.log(event);
  console.log(1);
});

emitter.log(() => {
  console.log('doing something!!!');
});
