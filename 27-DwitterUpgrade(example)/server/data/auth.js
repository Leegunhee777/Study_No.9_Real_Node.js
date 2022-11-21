let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$G9xf6asdglkajnsdglkasdjngalsndjg/alsdjgnaslkgunasldg',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function findByUsername(username) {
  return users.find(user => user.username === username);
}

export async function findById(id) {
  return users.find(user => user.id === id);
}
export async function createUser(user) {
  //Date.now()를 고유한 id로 사용하려고함!
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
