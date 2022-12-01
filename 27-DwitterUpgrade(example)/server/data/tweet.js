import * as userRepository from '../data/auth.js';
import { db } from '../db/database.js';

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

//모든 트윗메세지 가져오기,  작성한 사용자 정보포함  전부!!!
export async function getAll() {
  //<로컬 테스트용>
  // return Promise.all(
  //   tweets.map(async tweet => {
  //     const { username, name, url } = await userRepository.findById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url };
  //   })
  // );

  //<순수SQL>
  return db
    .execute(
      'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id ORDER BY tw.createdAt DESC'
    )
    .then(result => result[0]);
}

// 모든 트윗, 작성한 사용자 정보포함 가져오기 단 (인자로 받은 특정 유저네임이 작성한것에 대해서!)
export async function getAllByUsername(username) {
  //<로컬 테스트용>
  // return getAll().then(tweets => {
  //   return tweets.filter(tweet => tweet.username === username);
  // });

  //<순수SQL>
  return db
    .execute(
      'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id WHERE username=? ORDER BY tw.createdAt DESC',
      [username]
    )
    .then(result => result[0]);
}

//특정트윗가져오기!!!작성한 사용자 정보포함!!! 단!!!(인자로 받은 특정트윗의 고유id를 기준)
export async function getById(id) {
  //<로컬 테스트용>
  // const found = tweets.find(tweet => tweet.id === id);
  // if (!found) {
  //   return null;
  // }
  // const { username, name, url } = await userRepository.findById(found.userId);
  // return { ...found, username, name, url };

  //<순수SQL>
  return db
    .execute(
      'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id WHERE tw.id=? ORDER BY tw.createdAt DESC',
      [id]
    )
    .then(result => result[0][0]);
}

export async function create(text, userId) {
  //<로컬 테스트용>
  // const tweet = {
  //   id: Date.now().toString(),
  //   text,
  //   createdAt: new Date(),
  //   userId,
  // };
  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);

  //<순수SQL>
  return (
    db
      .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
        text,
        new Date(),
        userId,
      ]) //tweets테이블에 데이터를추가하면 result[0]에서 추가한 데이터에 대한 부분적인 정보를 읽을수있으며 inserId를 통해 해당 레코드의 primary key에 대한 값을 받을수있다.
      //해당 primary key와 getById함수를 이용해서 해당 tweet 정보 + 유저의 정보를 가져와서 리턴해준다!
      .then(result => getById(result[0].insertId))
  );
}

export async function update(id, text) {
  //<로컬 테스트용>
  // const tweet = tweets.find(tweet => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return getById(tweet.id);

  //<순수SQL>
  return (
    db
      .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
      //해당 tweet 정보 + 유저의 정보를 가져와서 리턴해준다!
      .then(() => getById(id))
  );
}

export async function remove(id) {
  //<로컬 테스트용>
  // tweets = tweets.filter(tweet => tweet.id !== id);

  //<순수SQL>
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}
