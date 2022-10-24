import express from 'express';
const app = express();

//.use를 이용하여 모든 request에 express에서 제공하는 .json()을 적용시킬것이다!!!
app.use(express.json());

app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.listen(8080);
