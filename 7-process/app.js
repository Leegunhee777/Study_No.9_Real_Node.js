const process = require('process');
/*
운영체제 정보를 가져올수있는 os 모듈에 이어서
현재 동작하고 있는 노드 프로세스에 대한 정보를 가져올수있는
*/

function a() {
  b();
}
function b() {
  console.log(1);
}

console.log(2);
a();
console.log(3);

setTimeout(() => {
  console.log('callbackFunction!!!');
}, 0);
console.log(4);

//nextTick도 동작원리가 setTimeout이랑 똑같다 기억해놔라!!!
//단 nextTick의 경우 태스크큐에 다른 setTimeout의 콜백함수...등등이 태스크큐에 쌓여있어도
//우선순위가 제일 높다 무조건 태스크큐 제일 앞부분에 넣어줌, 고로 바로 콜스백으로 뽑아올수있다!!!꿀팁!!!
process.nextTick(() => {
  console.log('nextTick');
});

/*
1. console.log(2)함수 콜스택에 쌓임, 내부적으로 추가호출함수없으니 실행후 콜스택비워짐, 콜스택비워졌으니
2. a()함수 콜스택에 쌓임, a()함수내부 b()함수 콜스택에 쌓임, b함수내부 추가호출없으니 b함수 실행후, 콜스택에서 없어지고
   a()함수도 다 실행되었으니 콜스택에서 사라짐
3. console.log(3)함수 콜스택에 쌓임, 내부적으로 추가호출 없으니 실행후 콜스택 비워짐
4. setTimeout함수 실행, 정의한 콜백을 nodeAPIs로 넘긴다, (넘기고바로 다음 함수 실행시킨다 settimeout시간동안 기다려줬다가 콜백을 실행시키지 않는다)
5. console.log(4)함수 콜스택에 쌓임, 내부적으로 추가호출 없으니 실행후 콜스택 비워짐
6. process.nextTick 함수실행, 정의한 콜백 nodeAPIs로 넘긴다.
7. 모든 함수가 실행되었으니, 이제 태스크큐에 있던 콜백들을 처리하게되는데, 태스크큐에서 nextTick의 콜백이 우선순위가 제일높기때문에 
8. 먼저 콜스택으로 가져와 실행되고 비워지고 그다음
9. 콜백함수(console.log('callbackFunction!!!'))가 이벤트루프에의해 콜스택으로 넘어와 실행후 비워지게된다.

-tip-
출력 결과:
2
1
3
4
nextTick
callbackFunction!!!

-setTimeout을 어떤 위치에서 호출해도 무조건 console.log(callbackFcuntion!!!)은 제일 마지막에 찍히게됨

-4번과정에서 nodeAPIs로 던져진 settimeout의 콜백은 비동기적으로 지정된 시간이 지나면 태스크큐에 던져진다.
태스큐에 던져진 콜백함수는 모든함수가 실행된후 (1번부터 5번까지의 모든 함수의 실행) 콜스택이 비워져있으면 태스크큐에서 콜스택으로 콜백함수를 가져와
해당 콜백함수를 실행하고 콜스택에서 사라진다.

*/
