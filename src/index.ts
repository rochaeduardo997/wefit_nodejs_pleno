import { instanceSequelizeMySQL } from './infra/db/sequelize/instance';
import RegisterPersonRepository from './infra/register_person/repository/RegisterPerson.repository';
import UserRepository from './infra/user/repository/User.repository';
import RegisterPersonController from './infra/controller/register_person/RegisterPerson.controller';
import UserController from './infra/controller/user/User.controller';
import ExpressAdapter from './infra/http/ExpressAdapter';
import RedisAdapter from './infra/cache/RedisAdapter';
import JWTAdapter from './infra/jwt/JWTAdapter';
import UpsertMainUserHandler from './user/application/UpsertMainUserHandler';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../.env' });

(async () => {
  const sequelize = await instanceSequelizeMySQL();
  const cache = new RedisAdapter();
  await cache.connect();
  const jwt = new JWTAdapter();

  const rpRepository = new RegisterPersonRepository(sequelize);
  const uRepository = new UserRepository(sequelize);

  const httpAdapter = new ExpressAdapter(cache, jwt);

  new RegisterPersonController(httpAdapter, rpRepository);
  new UserController(httpAdapter, uRepository, cache, jwt);

  const upsertHandler = new UpsertMainUserHandler(uRepository);
  await upsertHandler.execute({ username: 'support', password: 'password' });

  httpAdapter.init();
  httpAdapter.listen();
})();

