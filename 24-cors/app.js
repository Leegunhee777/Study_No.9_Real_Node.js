import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus: 200,
    //credentials: true를 옵션에 걸어주면
    //Access-Control-Allow-Credentials: true 를 헤더에 설정해주는거랑 같은 효과임
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, DELETE'
//   );
//   next();
// });

app.get('/', (req, res) => {
  res.send('Welcome!!!');
});

app.listen(8080);
