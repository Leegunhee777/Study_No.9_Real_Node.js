/*
Node.js는
컴퓨터 위에서 동작하는 javaScript 런타임 환경이기 때문에
브라우저 환경에서는 할 수 없었던 os, process, path, file, buffer, stream ...등의 작업들을 해볼수있었다.
추가적으로 커스텀 이벤트를 만들어보자
*/
const EventEmitter = require('events');
const emitter = new EventEmitter();

const callback1 = args => {
  console.log('first callback-', args);
};
emitter.on('ellie', callback1);

emitter.on('ellie', args => {
  console.log('second callback -', args);
});

emitter.emit('ellie', { message: 1 });
emitter.emit('ellie', { message: 2 });

//등록된 모든 콜백을 제거한다.
//emitter.removeAllListeners();

//특정 콜백만 제거할수도있다
emitter.removeListener('ellie', callback1);

emitter.emit('ellie', { message: 3 });
