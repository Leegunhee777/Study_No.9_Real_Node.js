const buf = Buffer.from('Hi');
//Buffer.from을 통해 버퍼를 만들수 있다.
//Hi라는 스트링을 메모리에 올릴때 어떤식으로 저장이 되는지 확인해보자

const bufTest = Buffer.from('Hi', 'utf8'); // 위 코드와 동일
//엄밀히 말하면 Buffer에서 별도로 인코딩을 지정하지 않으면 UTF-8 인코딩 방식을 쓴다.
//즉 위 코드와 동일하게 버퍼를 만든다

console.log(buf);
console.log(bufTest);
//출력: <Buffer 48 69> H는 유니코드!!! 48을 의미 i는 유니코드!!! 69를 의미

console.log(buf.length);
//Hi 여서 2가 나옴
//아래 처럼 배열의 엔덱스로 접근하면 유니코드가 아닌 아스키코드 형태로 출력을 볼수있게된다.
console.log(buf[0]);
console.log(buf[1]);

console.log(buf.toString());
//버퍼의 데이터를 우리가 아는 string형태로 바꾸려면 toString을 해주면된다.

//Create Buffer
const buf2 = Buffer.alloc(2);
//사이즈가 2개인 버퍼를 만든다.
//메모리에서 사용가능한 메모리를 찾아서 해당 메모리를 초기화 까지 시켜준다.

const buf3 = Buffer.allocUnsafe(2);
//allocUnsafe는 alloc과 같지만 초기화를 히지않는다. (초기화를 하지 않아 빠르지만, 초기화하는게 안전하다)

console.log(buf2);
console.log(buf3);

buf2[0] = 72; //배열 인덱스 접근은 아스키코드 기준임
buf2[1] = 105; //배열 인덱스 접근은 아스키코드 기준임
console.log(buf2); //이렇게찍으면 유니코드 utf-8기준 버퍼값이보임
console.log(buf2.toString());

//Copy Buffer, buf2의 데이터를 buf3으로 copy할수도 있음
buf2.copy(buf3);
console.log(buf3);

//Concat Buffer
const newBuf = Buffer.concat([buf2, buf3]);
console.log(newBuf.toString());

/*
버퍼라는것은 고정된 메모리 덩어리다~ 라고 생각하면됨 , 모든데이터들을 바이트단위로 처리할수있게해준다.
array of intergers!!!, byte of data!!!
*/
