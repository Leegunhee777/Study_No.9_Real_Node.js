const fs = require('fs');

const readStream = fs.createReadStream('./file2.txt', {
  highWaterMark: 8, // 스크림에서 한번에 가져오는 버퍼의 크기지정, 64 kbytes
  encoding: 'utf-8',
});

const data = [];

//데이터를 읽어올때 마다 실행, .once를 이용하면 처음 테이터를 받아올때만 실행시킬수도있음
readStream.on('data', chunk => {
  console.log(chunk);
  data.push(chunk);
  /*
    encoding옵션을 주지않으면 아래 처럼 출력된다. 
    <Buffer 20 31 2e 31 30 2e 33 32>
    <Buffer 20 61 6e 64 20 31 2e 31>
    <Buffer 30 2e 33 33 20 6f 66 20>
    <Buffer 22 64 65 20 46 69 6e 69>
    <Buffer 62 75 73 20 42 6f 6e 6f>

    encoding: 'utf-8' 옵션을 주면 우리가 아는 문자가 나온다.
    Where
    does it
    come fr
    om?
    Cont
    rary to 
  */
});

//스트림이 끝나고 end이벤트 발생하면!
readStream.on('end', () => {
  console.log(data.join(''));
});

readStream.on('error', error => {
  console.log(error);
});
