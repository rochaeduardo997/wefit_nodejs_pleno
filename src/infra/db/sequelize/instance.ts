import { Sequelize } from 'sequelize-typescript';
import PersonModel from '../../register_person/repository/PersonModel.model';
import ContactModel from '../../register_person/repository/ContactModel.model';
import AddressModel from '../../register_person/repository/AddressModel.model';

const instanceSequelizeSQLite3 = async () => {
  const database = process.env.MYSQLDB_DATABASE!;

  const result = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: { force: true },
    database
  });

  await syncModels(result);

  return result;
}

const instanceSequelizeMySQL = async () => {
  const database = process.env.MYSQLDB_DATABASE!;
  const username = process.env.MYSQLDB_USERNAME!;
  const password = process.env.MYSQLDB_PASSWORD!;
  const host     = process.env.MYSQLDB_HOST!;
  const port     = +process.env.MYSQLDB_PORT!;

  const result = new Sequelize({
    username, password, database, host, port,
    dialect: 'mysql',
    logging: false
  });

  await syncModels(result);

  return result;
}

const syncModels = async (sequelize: Sequelize): Promise<void> => {
  sequelize.addModels([
    PersonModel,
    ContactModel,
    AddressModel
  ]);

  await sequelize.sync();

  return;
}

export { instanceSequelizeMySQL, instanceSequelizeSQLite3 };
