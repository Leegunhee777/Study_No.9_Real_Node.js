type Tweet = {
  id: string;
  text: string;
  createdAt: Date;
  name: string;
  username: string;
  url?: string;
};

const tweets: Tweet[] = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date(),
    name: 'Bob',
    username: 'bob',
    url: 'sdfsdfdsf',
  },
];

//getAll함수는 Promise를 return 하고 return되는 데이터는 Tweet[]타입을 따른다.
//async를 사용하면 따로 Promise를 수동으로 return 하지 않아도 promise가 리턴된다.
export async function getAll(): Promise<Tweet[]> {
  return tweets;
}
