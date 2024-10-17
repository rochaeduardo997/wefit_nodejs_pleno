import { instanceSequelizeMySQL } from './infra/db/sequelize/instance';
import RegisterPersonRepository from './infra/register_person/repository/RegisterPerson.repository';
import RegisterPersonController from './infra/controller/register_person/RegisterPerson.controller';
import ExpressAdapter from './infra/http/ExpressAdapter';
import RedisAdapter from './infra/cache/RedisAdapter';
import JWTAdapter from './infra/jwt/JWTAdapter';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/./../.env' });

(async () => {
  const sequelize = await instanceSequelizeMySQL();
  const cache = new RedisAdapter();
  const jwt = new JWTAdapter();

  const rpRepository = new RegisterPersonRepository(sequelize);

  const httpAdapter = new ExpressAdapter(cache, jwt);

  new RegisterPersonController(httpAdapter, rpRepository);

  httpAdapter.init();
  httpAdapter.listen();
})();

