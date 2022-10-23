import express from 'express';
const app = express();

//client쪽에서 /api로 접근하였을때만 처리가능, 그외 /api/slkdjn 이런거 처리못함!!
app.all('/api/*', (req, res, next) => {
  console.log('all');
  next();
});

//client쪽에서 /sky 만경로로 가지고있으면!!! 모두 처리할수있음
app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});

//우리가 app.get메소드의 두번째인자로 넘기는 미들웨어부분인 콜백함수는, 배열형태로 여러콜백을 정의할수있다.
app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    res.send('Hello');
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
  next();
});

//존재하지않는 경로 접근시 처리해주는 미들웨어
app.use((req, res, next) => {
  res.status(400).send('Not available!!!');
});

//중간에 에러가 발생하더라도 제일 마지막에 있는 미들웨어가 에러를 처리할수있다!!
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry!!!');
});

app.listen(8080);
