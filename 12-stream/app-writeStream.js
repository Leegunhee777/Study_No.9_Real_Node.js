const fs = require('fs');

//해당 파일이 없으면 자동으로 만든다
const writeStream = fs.createWriteStream('./file4.txt');

writeStream.on('finish', () => {
  console.log('finished!');
});

writeStream.write('hello!');
writeStream.write('world!');
//.end를 호출해야 스크림이 끝나고, finish 이벤트가 발동된다.
writeStream.end();
