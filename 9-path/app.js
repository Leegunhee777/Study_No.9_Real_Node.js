const path = require('path');

console.log(__dirname);
console.log(__filename);

console.log(path.sep);
console.log(path.delimiter);

//basename 추출
console.log(path.basename(__filename));
//확장자 제거
console.log(path.basename(__filename, '.js'));

//dirname 추출
console.log(path.dirname(__filename));

//extension 확장자 추출
console.log(path.extname(__filename));

//parse
const parsed = path.parse(__filename);
console.log(parsed);
const str = path.format(parsed);
console.log(str);

//isAbsolute 절대경로인지 알수있는 방법이다.
console.log('isAbsolute', path.isAbsolute(__dirname));
console.log('isAbsolute?', path.isAbsolute('../'));

//normalize 잘못된 경로를 올바른,정상적인 포맷으로 바꿔준다
console.log(path.normalize('./folder//////sub'));

//join
console.log(path.join(__dirname, 'image'));

//path.sep구분자를 이용해서 새로운 경로를 만드는데 사용할수도있음
console.log(__dirname + path.sep + 'image');

/*
node의 글로벌 전역객체 안에 있는 
__dirname과
__filename을 찍어보면 
/Users/leegunhee/Desktop/RealNodeStudy/9-path
/Users/leegunhee/Desktop/RealNodeStudy/9-path/app.js
현재의 폴더명과 파일명을 찍어볼수있다.

출력:
/Users/leegunhee/Desktop/RealNodeStudy/9-path
/Users/leegunhee/Desktop/RealNodeStudy/9-path/app.js
/
:
app.js
app
/Users/leegunhee/Desktop/RealNodeStudy/9-path
.js
{
  root: '/',
  dir: '/Users/leegunhee/Desktop/RealNodeStudy/9-path',
  base: 'app.js',
  ext: '.js',
  name: 'app'
}
/Users/leegunhee/Desktop/RealNodeStudy/9-path/app.js
isAbsolute true
isAbsolute? false
folder/sub
/Users/leegunhee/Desktop/RealNodeStudy/9-path/image
/Users/leegunhee/Desktop/RealNodeStudy/9-path/image

운영체제에 따라 경로 표기법이 다르다 : 윈도우와 맥의 구분자가 다르다, 고로 path.sep로 쓰면 운영체제에 맞는 구분자를 사용할수있다.
POSIX (Unix: Mac, Linux): 'Users/.....'
Windows: 'C:\\temp\\myfile.html'
*/
