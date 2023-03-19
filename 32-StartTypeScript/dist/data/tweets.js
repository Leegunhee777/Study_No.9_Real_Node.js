"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const tweets = [
    {
        id: '1',
        text: '드림코더분들 화이팅!',
        createdAt: new Date(),
        name: 'Bob',
        username: 'bob',
        url: 'sdfsdfdsf',
    },
];
//getAll함수는 Promise를 return 하고 return되는 데이터는 Tweet[]타입을 따른다.
//async를 사용하면 따로 Promise를 수동으로 return 하지 않아도 promise가 리턴된다.
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return tweets;
    });
}
exports.getAll = getAll;
//# sourceMappingURL=tweets.js.map