import { db } from '../db/database.js';

//<로컬 테스트용>
let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$G9xf6asdglkajnsdglkasdjngalsndjg/alsdjgnaslkgunasldg',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    username: 'ellie',
    password: '$2b$12$G9xf6asdglkajnsdglkasdjngalsndjg/alsdjgnaslkgunasldg',
    name: 'Ellie',
    email: 'ekkue@gmail.com',
  },
];

//특정유저의 이름에 매칭되는 레코드 뽑아오기
export async function findByUsername(username) {
  //<로컬 테스트용>
  //return users.find(user => user.username === username);

  //<순수SQL>
  return db
    .execute('SELECT * FROM users WHERE username=?', [username])
    .then(result => result[0][0]);
}

//특정유저의 고유한 id에 매칭되는 레코드 뽑아오기
export async function findById(id) {
  //return users.find(user => user.id === id);
  //<순수SQL>
  return db
    .execute('SELECT * FROM users WHERE id=?', [id])
    .then(result => result[0][0]);
}

//새로운 유저 추가하기
export async function createUser(user) {
  //<로컬 테스트용>
  //Date.now()를 고유한 id로 사용하려고함!
  // const created = { ...user, id: Date.now().toString() };
  // users.push(created);
  // return created.id;

  //순수SQL
  const { username, password, name, email, url } = user;
  return db
    .execute(
      //id를 insert해주지않는이유는 스키마설정시 id는 자동증가되게 설정했기떄문이다.
      //?에 들어갈 value, 는 두번째인자의 배열안에 순서대로 명시해주면된다.
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      [username, password, name, email, url]
    ) //추가한 데이터의 주요키가 insertId로 반환된다
    .then(result => result[0].insertId);
}
