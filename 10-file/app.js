const fs = require('fs');
const { text } = require('stream/consumers');

try {
  //파일이름을 변경할수 있는 api
  fs.renameSync('./text.txt', './file-new.txt');
} catch (error) {
  console.log(error);
}

console.log('hello');

fs.rename('./file-new.txt', './text.txt', error => {
  console.log(error);
  //에러발생시 error인자를 받을수있는 콜백을 넘겨야함
  //비동기적이기때문에, 우리의 코드가 다 실행되고 난후, rename이 완료되면
  //해당 콜백이 실행되게된다!!!
});

fs.promises
  .rename('./text.txt', './file-new.txt')
  .then(() => {
    console.log('Done!');
  })
  .catch(error => {
    console.log(error);
  });

/*
fs file 모듈의 API는 세가지 형태로 제공되어진다.

1. rename(...., callback(error, data))
: 비동기방식

2. try { renameSync(...)} catch(e){}
:(비추천) 따로 콜백함수를 전달하지않는다, 끝날때까지 다음줄로 넘어가지 않는다 동기적이다 고로 에러가나면그냥 죽어버리니까, try catch로 에러핸들필수

3. promises.rename().then().catch()
: 비동기방식 promises안에 rename을 사용하면 promise형태로 사용할수 있다.
*/
