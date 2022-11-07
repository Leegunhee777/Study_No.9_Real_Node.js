import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  //모든에러를 한번에 내려주는것이 아니라 하나씩만 내려주고싶다면 [0]으로 내려줘도됨
  return res.status(400).json({ message: errors.array()[0].msg });
};

//핸들러는 여러가지를 등록할수있다, 배열 형태로 등록도 가능
app.post(
  '/users',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('이름은 두글자 이상!'),
    body('age').isInt().withMessage('숫자를 입력해'),
    body('email').isEmail().withMessage('이메일 입력해요').normalizeEmail(),
    body('job.name').notEmpty(),
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  [param('email').isEmail().withMessage('이메일 입력해요'), validate],
  (req, res, next) => {
    res.send('💌');
  }
);

app.listen(8080);
