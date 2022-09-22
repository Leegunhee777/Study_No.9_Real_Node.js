console.log(global);

global.hello = () => {
  global.console.log('hello');
};

global.hello();
hello();
/*
1. node.js 에는 global 이라는 글로벌 object가 있다.
브라우저에서는 window라는 글로벌 object가 있듯이!!

글로벌 객체는 생략이 가능함으로

global.function() == funcion();
window.function() == function(); 
같은 의미임
*/
