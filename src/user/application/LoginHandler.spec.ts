import { Sequelize } from 'sequelize-typescript';
import IUserRepository from '../repository/UserRepository.interface';
import { instanceSequelizeSQLite3 } from '../../infra/db/sequelize/instance';
import UserRepository from '../../infra/user/repository/User.repository';
import User from '../entity/User';
import LoginHandler from './LoginHandler';
import * as dotenv from 'dotenv';
import ICache from '../../infra/cache/cache.interface';
import CacheFake from '../../infra/cache/cache.fake';
import IJWT from '../../infra/jwt/jwt.interface';
import JWTFake from '../../infra/jwt/jwt.fake';
import CreateHandler from './CreateHandler';
dotenv.config();

const input = { 
  id:       'id', 
  username: 'username', 
  password: 'password',
  status:   true
};

let sequelize: Sequelize;
let userRepository: IUserRepository;
let createHandler: CreateHandler;
let cache: ICache;
let jwt: IJWT;

beforeEach(async () => {
  sequelize = await instanceSequelizeSQLite3();
  userRepository = new UserRepository(sequelize);
  cache = new CacheFake();
  jwt = new JWTFake();
  createHandler = new CreateHandler(userRepository);
});
afterEach(async () => await sequelize.close());

describe('success', () => {
  test('login', async () => {
    const user = await createHandler.execute({ ...input });
    const loginHandler = new LoginHandler(userRepository, cache, jwt);
    const result = await loginHandler.execute({ login: user.username, password: input.password });
    expect(result.id).toBeDefined();
    expect(result.username).toEqual(input.username);
    expect(result.status).toEqual(input.status);
    expect(result.token).toBeDefined();
  });
});

describe('fail', () => {
  test('fail login with invalid login/password', async () => {
    const loginHandler = new LoginHandler(userRepository, cache, jwt);
    await expect(() => loginHandler.execute({ login: 'invalid_login', password: 'invalid_password' }))
      .rejects
      .toThrow('incorrect login/password');
  });
});
