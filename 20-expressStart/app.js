import express from 'express';
const app = express();

app.get('/sky/:id', (req, res, next) => {
  console.log(req.path);
  console.log(req.headers);
  console.log(req.params);
  console.log(req.query);
  console.log('get');

  //res.send('Hi');
  //res.json({ name: 'Gunhee' });
  //res.sendStatus(400);
  res.setHeader('key', 124);
  res.setHeader('qwe', 'qweqwe');

  //res.send로 텍스트타입도 보낼수있고
  // res.status(201).send('created');

  //jons타입으로도 보낼수 있다.
  res.status(200).json({ name: 'Gunhee' });

  //status코드만 보낼수도있다.
  // res.sendStatus(400);
});
app.listen(8080);
