import supertest from 'supertest';
import ExpressAdapter from '../../http/ExpressAdapter';
import TestAgent from 'supertest/lib/agent';
import UserController from './User.controller';
import IUserRepository from '../../../user/repository/UserRepository.interface';
import UserRepository from '../../user/repository/User.repository';
import { instanceSequelizeSQLite3 } from '../../../infra/db/sequelize/instance';
import { Sequelize } from 'sequelize-typescript';
import User from '../../../user/entity/User';
import ICache from '../../cache/cache.interface';
import CacheFake from '../../cache/cache.fake';
import * as dotenv from 'dotenv';
import IJWT from '../../jwt/jwt.interface';
import JWTFake from '../../jwt/jwt.fake';
import CreateHandler from '../../../user/application/CreateHandler';
dotenv.config();

let request: TestAgent;
let sequelize: Sequelize;
let cache: ICache;
let jwt: IJWT;
let userRepository: IUserRepository;
let createHandler: CreateHandler;
const input = { 
  id:       'id', 
  username: 'username', 
  password: 'password',
  status:   true
};

beforeEach(async () => {
  cache = new CacheFake();
  jwt = new JWTFake();
  sequelize = await instanceSequelizeSQLite3();
  userRepository = new UserRepository(sequelize);
  const httpAdapter = new ExpressAdapter(cache, jwt);
  new UserController(httpAdapter, userRepository, cache, jwt);
  httpAdapter.init();
  request = supertest(httpAdapter.app);
  createHandler = new CreateHandler(userRepository);
});
afterEach(() => sequelize.close());

describe('success', () => {
  test('login', async () => {
    const { id } = await createHandler.execute({ ...input });
    const { status, body } = await request
      .post('/api/v1/login')
      .send({ login: input.username, password: input.password });
    expect(body?.result?.id).toEqual(id);
    expect(body?.result?.username).toEqual(input.username);
    expect(body?.result?.status).toEqual(input.status);
    expect(body?.result?.token).toBeDefined();
    expect(status).toEqual(200);
  });
});

describe('fail', () => {
  test('fail on request without token', async () => {
    await userRepository.create(new User(input));
    const { status, body } = await request
      .post('/api/v1/logout')
      .set('Authorization', 'invalid_token');
    expect(body?.msg).toEqual('invalid token');
    expect(status).toEqual(401);
  });

  test('fail on login with invalid login', async () => {
    await userRepository.create(new User(input));
    const { status, body } = await request
      .post('/api/v1/login')
      .send({ login: 'invalid_login', password: input.password });
    expect(body?.msg).toEqual('incorrect login/password');
    expect(status).toEqual(400);
  });

  test('fail on login with invalid password', async () => {
    await userRepository.create(new User(input));
    const { status, body } = await request
      .post('/api/v1/login')
      .send({ login: input.username, password: 'invalid_password' });
    expect(body?.msg).toEqual('incorrect login/password');
    expect(status).toEqual(400);
  });
});
