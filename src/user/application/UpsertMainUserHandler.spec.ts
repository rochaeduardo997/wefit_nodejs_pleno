import { Sequelize } from 'sequelize-typescript';
import IUserRepository from '../repository/UserRepository.interface';
import UpsertMainUserHandler from './UpsertMainUserHandler';
import { instanceSequelizeSQLite3 } from '../../infra/db/sequelize/instance';
import UserRepository from '../../infra/user/repository/User.repository';

const input = { 
  username: 'username', 
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
  test('upsert user', async () => {
    const upsertHandler = new UpsertMainUserHandler(userRepository);
    const result = await upsertHandler.execute(input);
    expect(result).toEqual(true);
  });
});
