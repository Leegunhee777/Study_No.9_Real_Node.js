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
  res.status(201).send('created');
});
app.listen(8080);
