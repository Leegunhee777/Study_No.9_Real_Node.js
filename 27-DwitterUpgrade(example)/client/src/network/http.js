export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    let data;
    //json()도 promise이기때문에 await를 사용해준다.
    //추가로 response에 body가 없는 response에!!! json을 사용할 경우!!! 에러가 날수도 있으니
    //애러 핸들을해준다.
    try {
      data = await res.json();
    } catch (error) {
      console.log(error);
    }

    if (res.status < 200 || res.status > 299) {
      //서버에서 에러메세지를 넘겨줄경우 그걸 사용하고 그게 아니라면 Something...을 사용
      const message =
        data && data.message ? data.message : 'Something went wrong!';

      const error = new Error(message);
      // 토큰만료라던가...auth와 관련된 에러라면!
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw new Error(message);
    }
    return data;
  }
}
