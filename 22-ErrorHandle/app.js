import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

app.get('/file1', (req, res) => {
  //비동기 error handle
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });

  //동기 error handle
  // try {
  //   const data = fs.readFileSync('/file.txt');
  // } catch (error) {
  //   res.status(404).send('File not found');
  // }
});

app.get('/file2', (req, res, next) => {
  //Promise 방식  == 비동기 방식

  fsAsync
    .readFile('/file.txt')
    .then(data => {})
    .catch(next);

  //tip 전달인자와 호출인자가 같을 경우엔 생략가능
});

app.get('/file3', async (req, res) => {
  //await를 했기때문에 fsAsync임에도 불구하고 동기적이다!!!
  try {
    const data = await fsAsync.readFile('/file.txt');
  } catch (error) {
    res.status(404).send('File not found');
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
