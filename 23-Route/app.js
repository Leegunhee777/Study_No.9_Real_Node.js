import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

//1. REST API에서 body를 파싱할때 사용하는 내부 미들웨어!
app.use(express.json());

//2. HTML Form에서 Submit을 하면 request가 자동으로 발생하게되는데,
//그때 전달된 HTML에서 만든 데이터를 body안으로 자동으로 파싱해준다.
app.use(express.urlencoded({ extended: false }));

//3. client 측에서 서버의 리소스에 접근할수있게해줌
//public폴더내의 리소스를 사용자가 읽을수있게 만들거야~ 라는말임
//http://localhost:8080/index.html
//http://localhost:8080/image.png
//이런식으로 접근하면 서버의 public 폴더내의 리소스에 접근할수있음
const options = {
  dotfiles: 'ignore', //숨겨진 파일을 보여지지않게한다.
  etag: false,
  index: false,
  maxAge: '1d', //캐시 수명
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()); //헤더에 필요한 정보 추가
  },
};
app.use(express.static('./public/', options));

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);
