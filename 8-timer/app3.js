console.log('code1');
console.time('timeout 0');
setTimeout(() => {
  console.timeEnd('timeout 0');
}, 0);

/*
재미있는사실
console.time을 통해 시간을 측정해볼수있는데,
보통 상식적으로 setTimeout 의 콜백을 0초로하면 0초가 나와야할것같지? 그건 사실이 아니야~~

내가 테스트를 해보려고
setTimeout 호출직전에 time을 걸고
setTimeout의 콜백이 실행되는시점에 timeEnd를 걸어봤는데
0.7초나 걸리더라 신기하지??
*/
