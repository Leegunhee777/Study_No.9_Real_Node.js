const jwt = require('jsonwebtoken');

const key = 'hP3&b9IRpT9D';

//sign함수를 통해 jwt를 만들수있다!!
const token = jwt.sign(
  {
    id: 'userId',
    isAdmin: true,
  },
  key
);

console.log(token);

//verift를 통해 jwt토큰에 정보를 확인할수있다.
//첫번째인자 encoded된 jwt토큰, 두번째인자 secret Key, 세번째인자 decoded 된 결과를 받을수있는 콜백함수
jwt.verify(token, key, (error, decoded) => {
  console.log(error, decoded);
});
