let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

module.exports.getCount = getCount;
module.exports.increase = increase;

/*노드 자체적으로 
예전에 이런 module 시스템을 만들었고 
2015년 javaScript ES6버전부터는 
javaScript 프로그래밍 언어 자체에서
module을 지원해주고있다!
*/
