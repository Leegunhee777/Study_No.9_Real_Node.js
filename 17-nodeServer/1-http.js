const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  console.log('incoming...');
  if (req.url === '/') {
    res.write('only text response');
    res.end();
  } else if (req.url === '/course') {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write('<html>');
    res.write('<head><title>Hi</title></head>');
    res.write('<body><h1>Welcome!!!</h1></body>');
    res.write('</html>');
    res.end();
  } else {
    res.setHeader('Content-Type', 'text/html');
    const read = fs.createReadStream('./test.html');
    read.pipe(res);
  }
});

server.listen(8080);
/*
node 서버를 만들기위해선 node에서 제공하는 http 모듈을 이용해야한다.
포트 8080으로 서버를 구동하는 코드이다.
URL http://localhost:8080/를 통해 접근가능하다
res로 텍스트와 HTML로 응답해보자!!!

여기서
pipe를 사용할때도 다른 애들 res처럼
res.end()호출해줘야하는거 아닌가?
라고 생각해서

res.setHeader('Content-Type', 'text/html');
const read = fs.createReadStream('./test.html');
read.pipe(res);
res.end()를 사용해줘야하는거 아니야???라고 생각할수 있는데 res.end()를 사용하면 
우리가 예상한 html파일이 response로 보내지지 않는다
why?!!
스트림은 기본적으로 Event Driven형태로 구현되어있다. 즉,
pipe는 비동기적인 함수 이므로, 호출만 해놓고 (작업이 끝나길 기다리지 않고) 다음 코드 라인으로 넘어가죠. 
그래서 piping이 되고 있는 중간에 res.end를 호출하게 되면 파이핑이 멈추게 된답니다. 
그리고 pipe이 끝나면 자동으로 end() 처리가 되므로, 수동적으로 호출해줄 필요는 없어요 🙌
*/
