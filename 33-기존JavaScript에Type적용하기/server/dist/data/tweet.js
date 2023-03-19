var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as userRepository from './auth.js';
let tweets = [
    {
        id: '1',
        text: '드림코더분들 화이팅!!!!!',
        createdAt: new Date(),
        userId: '1',
    },
    {
        id: '2',
        text: '안뇽!',
        createdAt: new Date(),
        userId: '1',
    },
];
export function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(tweets.map((tweet) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findById(tweet.userId);
            return Object.assign(Object.assign({}, tweet), { username: user === null || user === void 0 ? void 0 : user.username, name: user === null || user === void 0 ? void 0 : user.name, url: user === null || user === void 0 ? void 0 : user.url });
        })));
    });
}
export function getAllByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return getAll().then(tweets => tweets.filter(tweet => tweet.username === username));
    });
}
export function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const found = tweets.find(tweet => tweet.id === id);
        if (!found) {
            return null;
        }
        const user = yield userRepository.findById(found.userId);
        return Object.assign(Object.assign({}, found), { username: user === null || user === void 0 ? void 0 : user.username, name: user === null || user === void 0 ? void 0 : user.name, url: user === null || user === void 0 ? void 0 : user.url });
    });
}
export function create(text, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const tweet = {
            id: new Date().toString(),
            text,
            createdAt: new Date(),
            userId,
        };
        tweets = [tweet, ...tweets];
        return (yield getById(tweet.id));
    });
}
export function update(id, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const tweet = tweets.find(tweet => tweet.id === id);
        if (tweet) {
            tweet.text = text;
        }
        return getById(id);
    });
}
export function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        tweets = tweets.filter(tweet => tweet.id !== id);
    });
}
//# sourceMappingURL=tweet.js.map