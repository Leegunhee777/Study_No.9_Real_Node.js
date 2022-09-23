console.log('123');
console.clear();

//log level
console.log('log'); //개발용
console.info('info'); //정보
console.warn('warn'); //경보
console.error('error'); //에러, 사용자 에러, 시스템 에러

//assert : 첫번째 인자가 true가 아니면, 두번째 인자가 로그로 찍힘
console.assert(2 === 3, 'not same!');
console.assert(2 === 2, 'same!');

//print object
const student = { name: 'ellie', age: 20 };
console.log(student);
//object를 table형식으로 찍어볼수있음
console.table(student);

const testData = { name: 'ellie', age: 20, company: { name: 'AC' } };
//depth를 통해 중첩 object 내부 값도 log로 찍어볼수있음
console.dir(testData, { showHidden: true, colors: false, depth: 2 });

//측정용 : time과 End사이의 실행 시간을 측정할수있음
console.time('for loop');
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd('for loop');

//trace 디버깅에서 유용하게 사용할수있음, 해당함수가 호출된 흔적을 trace할수있음
function f1() {
  f2();
}
function f2() {
  f3();
}
function f3() {
  console.log('f3');
  console.trace();
}

f1();
