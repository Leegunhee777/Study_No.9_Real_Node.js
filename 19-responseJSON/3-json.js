const http = require('http');

const courses = [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JS' }];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/course') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(courses));
    } else if (method === 'POST') {
      const body = [];
      req.on('data', chunk => {
        console.log(chunk);
        console.log(chunk.toString());
        body.push(chunk);
      });

      req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const course = JSON.parse(bodyStr);
        courses.push(course);
        console.log(courses);
        //POST에 대한 처리임으로 서버측 데이터가 추가되어야하고
        //추가 완료됨을 알리는 201코드가 적절
        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8080);
