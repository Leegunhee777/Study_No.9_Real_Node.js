import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

export const jwtSecretKey = 'F2dN5x7slkfjanlduDKD';
const jwtExpiresInDays = 86400; //'2d';로 이틀을 입력할수도있음
//Salt의 길이 지정
const bcryptSaltRounds = 12;

//임의의 csrfKey, 한마디로 csrfKey라는 원본 비밀번호를 서버에서 환경변수로 가지고있다고 생각해라
export const csrf_secret_key = 'laskdjfnlakjdsfn';

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);

  //found가 true라는 말은 이미 가입한 사용자 라는 말
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  //사용자의 고유한 id를 기반으로 jwt토큰을 만든다.
  const token = createJwtToken(userId);
  setToken(res, token);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  //compare를 통해 암호화전과 암호화후의 비밀번호를 비교할수있음
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
}

export async function logout(req, res, next) {
  //header의 cookie의 token을 ''으로 초기화해주면서 로그아웃기능을 구현해줌
  res.cookie('token', '');
  res.status(200).json({ message: 'User has been logged out' });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

function setToken(res, token) {
  const options = {
    maxAge: jwtExpiresInDays * 1000,
    httpOnly: true, //HTTP-ONLY
    sameSite: 'none', //CORS 설정과 비슷하게 서버와 다른 도메인을 가진 client를 허용해주는 옵션설정이다
    secure: true,
  };
  res.cookie('token', token, options); //HTTP-ONLY
}
export async function me(req, res, next) {
  //isAuth 미들웨어에서 만들어준 userId를 이용하고있음
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  console.log(req.authorization);
  //토큰과 함께 유저데이터를 내려준다.
  res.status(200).json({
    //이렇게 req Header의 Auth정보를 뽑을수도있다.
    // token: req.get('Authorization').split(' ')[1],
    token: req.token,
    username: user.username,
  });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  //임의의 csrfKey, 한마디로 csrfKey라는 원본 비밀번호를 서버에서 환경변수로 가지고있다고 생각해라
  return bcrypt.hash(csrf_secret_key, 1);
}
