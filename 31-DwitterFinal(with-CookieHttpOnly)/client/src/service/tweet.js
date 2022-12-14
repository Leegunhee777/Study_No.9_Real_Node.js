export default class TweetService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  async getTweets(username) {
    let query = username ? `?username=${username}` : '';
    return await this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets/`, {
      method: 'POST',
      body: JSON.stringify({
        text,
        username: 'ellie',
        name: 'Ellie',
      }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
