import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json());

//도메인별 모듈화와 유지보수가 용이하게 됨!
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);
