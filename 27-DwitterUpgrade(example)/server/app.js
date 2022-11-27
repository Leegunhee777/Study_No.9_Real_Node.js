import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import dotenv from 'dotenv';

import { initSocket } from './connection/socket.js';

dotenv.config();
console.log(process.env);
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
//소켓 사용하기 전 원래 코드
// app.listen(8080);

const server = app.listen(8080);
initSocket(server);
