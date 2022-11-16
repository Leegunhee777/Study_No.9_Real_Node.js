const bcrypt = require('bcrypt');

const password = 'abcd1234';

//hasSync의 두번째인자로 salt의 길이를 지정할수있다
const hashed = bcrypt.hashSync(password, 10);

console.log(`password: ${password}, hased: ${hashed}`);

//암호회된 password와 원래 password를 비교하는 compare함수도있음
const result = bcrypt.compareSync(password, hashed);
console.log(result);
