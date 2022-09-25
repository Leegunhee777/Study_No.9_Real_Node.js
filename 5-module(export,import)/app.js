import { increase, getCount } from './counter.js';

increase();
console.log(getCount());

/*
javaScript 프로그래밍 언어 자체에서
module을 사용하는 방법을 알려주겠다.

우선 우리가 작업하고 있는 5-module 폴더 경로 안에 들어가서
npm init --yes 를 친다.
그러면 생성되는 pakage.json파일에서
type 이라는 속성에 module 설정을 해준다.
그러면 export import 를 사용할수있게됨

type 에는 common.js 와 module을 설정해줄수있다.
common.js는 노드환경(default) : module exports와 require를 사용 해야하는 환경
module: ES6부터 javaScript언어 자체에서 지원하는 export import를 사용할수있는 type
*/
