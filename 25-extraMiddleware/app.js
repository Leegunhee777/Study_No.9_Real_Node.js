import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(morgan('combined'));
app.use(helmet());
app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  //app.use(cookieParser());를 해주어야지만 req.cookies를 찍어볼수있다!!!
  //req.cookies는 request Header의 Cookie라는 키값으로 명시한 값이 출력되는것이다!
  console.log(req.cookies);
  res.send('Welcome!!!');
});

app.listen(8080);
