const { readdir } = require('fs');

const fs = require('fs').promises;

//<read a file>
fs.readFile('./text.txt')
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));

/*
log를 보면 .txt에 입력한 text가 아래처럼 출력된다.
버퍼형태로 데이터를 가져온다.
<Buffer 73 72 6c 6b 6a 73 6e 65 6c 72 6b 6a>
  */

//<read a file>
fs.readFile('./text.txt', 'utf-8')
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));
//옵션으로 utf-8으로 인코딩하여 우리가 아는 text로 로그를 볼수도있다.

//<write a file> : 아예 통으로 덮어 씌워짐
fs.writeFile('./text.txt', 'Hello,world!!!').catch(error => console.log(error));

//뒤에 이어 붙이려면 append 사용해애함
fs.appendFile('./text.txt', ' Yo!!!')
  .then(() => {
    fs.copyFile('./text.txt', './tes34t.txt').catch(error =>
      console.log(error)
    );
  })
  .catch(error => console.log(error));

//<cody a file : 다른 파일에 복사할수도 있음, 두번째인자에 명시하는 옮겨적는 파일이 존재하지 않는다면 해당 파일을 만들어 옮겨준다>
//위의 api들은 모두 비동기이기때문에 그들의 순서가 보장되지않는다
//그래서 coypFile을해도 쓰기도 전에 복사해서 옮기는 상황이 연출되어서 제대로된 복사가 안되는것처럼 보일수도있다.
//그래서 appendFile의 then안에서 호출해보자
fs.copyFile('./text.txt', './test.txt').catch(error => console.log(error));

//<make folder>
fs.mkdir('sub-folder').catch(error => {
  console.log(error);
});

//명시한 경로에 존재하는 모든 파일과 폴더 name을 읽어올수있다.
fs.readdir('./')
  .then(data => console.log(data))
  .catch(error => console.log(error));
