const _ = require('underscore');

console.log('app!');

const array = [1, 2];
_.forEach(array, num => console.log(num));
array.forEach(num => console.log(num));
//위의 두 코드가 같은코드임 _모듈은 현재시점에서 더이상 필요하지 않은 라이브러리이다.
console.log('Hi2333');
