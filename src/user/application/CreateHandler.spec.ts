import { Sequelize } from 'sequelize-typescript';
import IUserRepository from '../repository/UserRepository.interface';
import CreateHandler from './CreateHandler';
import { instanceSequelizeSQLite3 } from '../../infra/db/sequelize/instance';
import UserRepository from '../../infra/user/repository/User.repository';

const input = { 
  username: 'username', 
  fullname: 'fullname', 
  email: 'email@email.com', 
  password: 'password',
  status: true
};

let sequelize: Sequelize;
let userRepository: IUserRepository;

beforeEach(async () => {
  sequelize = await instanceSequelizeSQLite3();
  userRepository = new UserRepository(sequelize);
});
afterEach(async () => await sequelize.close());

describe('success', () => {
  test('create user with all fields', async () => {
    const createHandler = new CreateHandler(userRepository);
    const result = await createHandler.execute(input);
    expect(result.username).toEqual(input.username);
    expect(result.status).toEqual(input.status);
  });
});

describe('fail', () => {
  test('fail on create user with same username', async () => {
    const createHandler = new CreateHandler(userRepository);
    await createHandler.execute(input);
    await expect(() => createHandler.execute({ ...input }))
      .rejects
      .toThrow('username must be unique');
  });

  test('fail on create user without password', async () => {
    const createHandler = new CreateHandler(userRepository);
    await expect(() => createHandler.execute({ ...input, password: '' }))
      .rejects
      .toThrow('password must be provided');
  });
});
