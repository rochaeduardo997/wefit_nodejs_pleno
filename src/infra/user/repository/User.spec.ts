import { Sequelize } from 'sequelize-typescript';
import User from '../../../user/entity/User';
import IUserRepository from '../../../user/repository/UserRepository.interface';
import UserRepository from './User.repository';
import { instanceSequelizeSQLite3 } from '../../db/sequelize/instance';
import * as dotenv from 'dotenv';
dotenv.config();

let sequelize:  Sequelize;
let repository: IUserRepository;

beforeEach(async () => {
  sequelize  = await instanceSequelizeSQLite3();
  repository = new UserRepository(sequelize);
});
afterEach(async () => await sequelize.close());

const input = { 
  id:       'id', 
  username: 'username', 
  fullname: 'fullname', 
  email:    'email@email.com', 
  password: 'password',
  status:   true
};

describe('success', () => {
  test('login with username', async () => {
    const user = await repository.create(new User(input));
    const result = await repository.login({ login: user.username, password: user.password });
    expect(result.id).toEqual(user.id);
    expect(result.username).toEqual(user.username);
    expect(result.status).toEqual(user.status);
  });

  test('upsert without existing', async () => {
    await expect(() => repository.upsertMainUser(new User(input)));
  });
});

describe('fail', () => {
  test('fail on login with invalid password', async () => {
    const user = await repository.create(new User(input));
    await expect(() => repository.login({ login: user.username, password: 'invalid_password' }))
      .rejects
      .toThrow('incorrect login/password');
  });
});
