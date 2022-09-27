console.log('code1');

setTimeout(() => {
  console.log('setTimeout 0');
}, 0);

console.log('code2');
setImmediate(() => {
  console.log('setImmediate');
});

console.log('code3');
process.nextTick(() => {
  console.log('process.nextTick');
});

/*
출력 순서
code1
code2
code3
process.nextTick
setTimeout 0
setImmediate
*/
