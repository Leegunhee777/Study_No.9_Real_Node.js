import axios from 'axios';
import axiosRetry from 'axios-retry';

export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    //axiosRetry의 첫번째 인자로 axios instance를 넣어줘야 한다.
    axiosRetry(this.client, {
      retries: 5,
      retryDelay: retry => {
        //몇번째 재시도인지 인자로 받을수있고, 재시도 횟수가 많아질수록 delay도 길게 설정해준다. 지수함수이용!
        const delay = Math.pow(2, retry) * 100; //ms 기준이므로, 100ms, 200ms, 400ms, 800ms...시간간격으로 재시도를 하게됨

        //근데 이렇게만 처리하면, 어러명의 client가 과부하에의해 request거부 당했을때,
        //재시도 타이밍도 겹칠수 있게된다. 타이밍을 약간씩 어긋나게 해주기위해 jitter해줘야한다 진동을 줘서,
        //겹치지 않게 해줘야한다는 말이다.
        const jitter = delay * 0.1 * Math.random();

        return delay + jitter;
      },

      //어떤 조건에서 network retry를 할건지 명시해줄수있음
      //따로 명시해주지 않으면, network에러나 Or request가 실패했을때만 재시도를하게 default 설정되어있다.
      retryCondition: err => {
        return (
          //네트워크 에러나 IdempotentRequest(아무리 많이 요청을해도 서버의 상태를 변화시키지 않는 요청)와 관련된 에러이거나
          //response.status가 429(too many request)일때 retry를 하게 커스텀 설정해주었다.
          axiosRetry.isNetworkOrIdempotentRequestError(err) ||
          err.response.status === 429
        );
      },
    });
  }

  async fetch(url, options) {
    const { body, method, headers } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
        'dwitter-csrf-token': this.getCsrfToken(),
      },
      data: body,
    };

    //axios는 자동으로 json으로 변환까지도 해준다.

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      //network error가 발생했거나, status code가 200~ 대가 아니면 catch로 들어오게된다.
      if (err.response) {
        const data = err.response.data;
        const message =
          data && data.message ? data.message : 'Something went wrong!';

        throw new Error(message);
      }

      //네트워크 에러로 인한 에러
      throw new Error('connection Error!');
    }
  }

  // async fetch(url, options) {
  //   const res = await fetch(`${this.baseURL}${url}`, {
  //     ...options,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...options.headers,
  //       'dwitter-csrf-token': this.getCsrfToken(),
  //     },
  //     credentials: 'include', //서버로부터 설정된 브라우저의 쿠기정보를 request시에 자동으로 넣어주기위한 옵션설정
  //   });
  //   let data;
  //   //json()도 promise이기때문에 await를 사용해준다.
  //   //추가로 response에 body가 없는 response에!!! json을 사용할 경우!!! 에러가 날수도 있으니
  //   //애러 핸들을해준다.
  //   try {
  //     data = await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   if (res.status < 200 || res.status > 299) {
  //     //서버에서 에러메세지를 넘겨줄경우 그걸 사용하고 그게 아니라면 Something...을 사용
  //     const message =
  //       data && data.message ? data.message : 'Something went wrong!';

  //     const error = new Error(message);
  //     // 토큰만료라던가...auth와 관련된 에러라면!
  //     if (res.status === 401) {
  //       this.authErrorEventBus.notify(error);
  //       return;
  //     }
  //     throw new Error(message);
  //   }
  //   return data;
  // }
}
