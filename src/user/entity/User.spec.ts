import User from "./User";

let user: User;
const input = { 
  id:       'id', 
  username: 'username', 
  password: 'password',
  status:   true
};

beforeEach(() => user = new User(input));

describe('success', () => {
  test('create user with status as false', () => {
    const user = new User({ ...input, status: false });
    expect(user.id).toEqual(input.id);
    expect(user.username).toEqual(input.username);
    expect(user.password).toEqual(input.password);
    expect(user.status).toEqual(false);
  });
});

