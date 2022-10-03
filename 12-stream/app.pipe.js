const fs = require('fs');
//압축할수있는 스트림 모듈
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const writeStream = fs.createWriteStream('./file4.txt');

const piping = readStream.pipe(writeStream);
// 파이프를 통해 readStream에서 읽어온 데이터를 그대로 writeStream에 연결해줄수있다.
// 파이프를 이용하여 스트림과 스트림을 이어줄수있다.

piping.on('finish', () => {
  console.log('done!!!');
});

//파이프끼리 연결할수 있어서, 읽는 스크림을 , 앞축스트림과 연결하고, 그 다음 쓰는 스크림에 연결할수도있다.
//읽어서 압축 압축된 데이터를 쓰기가 가능하다는말
const readStream2 = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream2 = fs.createWriteStream('./file5.zip');
const piping2 = readStream2.pipe(zlibStream).pipe(writeStream2);
piping2.on('finish', () => {
  console.log('압축 done');
});
