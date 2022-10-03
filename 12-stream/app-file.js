const fs = require('fs');

const beforeMem = process.memoryUsage().rss;
fs.readFile('./file.txt', (_, data) => {
  fs.writeFile('./file3.txt', data, () => {});
  //calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
  //파일을 읽고 새로운 .txt에 입력하는데 노드에서 사용한 메모리를 찍어볼수있음
  //But!!!!!해당 파일이 내가 가지고있는 컴퓨터 메모리보다 큰사이즈라면 읽을수도없음

  //질문!!! fs.writeFile 을 주석처리해도 값이 달라지지않는다. why?
  //쓰는데까지 라고 언급 했지만, 사실 쓰는데는 추가적인 메모리를 소모 하지 않음
  //파일에서 -> 메모리로 읽어서 (여기서 메모리 소모)
  //메모리 데이터를 -> 파일로 저장 (별도로 메모리가 소모 되지 않음)
  //그래서 write 콜백에서 측정하지 않고, 읽자마자 측정함, 어차피 쓰는데는 메모리소모안하기때문에
});
