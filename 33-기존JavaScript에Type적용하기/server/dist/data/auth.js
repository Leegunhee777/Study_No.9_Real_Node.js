var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
    {
        id: '1',
        username: 'bob',
        password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
        name: 'Bob',
        email: 'bob@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: '2',
        username: 'ellie',
        password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
        name: 'Ellie',
        email: 'ellie@gmail.com',
    },
];
export function findByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return users.find((user) => user.username === username);
    });
}
export function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return users.find((user) => user.id === id);
    });
}
export function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const created = Object.assign(Object.assign({}, user), { id: Date.now().toString() });
        users.push(created);
        return created.id;
    });
}
//# sourceMappingURL=auth.js.map