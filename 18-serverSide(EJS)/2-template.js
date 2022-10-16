const http = require('http');
const ejs = require('ejs');

const name = 'gunhee';
const course = [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JS' }];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  if (req.url === '/') {
    ejs.renderFile('./template/index.ejs', { name: name }).then(data => {
      res.end(data);
    });
  } else if (req.url === '/course') {
    ejs.renderFile('./template/course.ejs', { course: course }).then(data => {
      res.end(data);
    });
  } else {
    ejs.renderFile('./template/not-found.ejs', { name: name }).then(data => {
      res.end(data);
    });
  }
});

server.listen(8080);
