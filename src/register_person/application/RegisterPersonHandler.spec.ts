import { Sequelize } from 'sequelize-typescript';
import { instanceSequelizeSQLite3 } from '../../infra/db/sequelize/instance';
import RegisterPersonHandler from './RegisterPersonHandler';
import IRegisterPersonRepository from '../repository/RegisterPersonRepository.interface';
import RegisterPersonRepository from '../../infra/register_person/repository/RegisterPerson.repository';
import Person from '../entity/Person';
import Contact from '../value-object/Contact';
import Address from '../value-object/Address';
import * as dotenv from 'dotenv';
dotenv.config();

let sequelize:  Sequelize;
let registerPersonRepository: IRegisterPersonRepository;
let registerPersonHandler: RegisterPersonHandler;

const contact = { cellphone: 11111111111, telephony: 11111111111, email: 'email@email.com' };
const address = {
  zipcode: 11111111,
  street: 'street',
  streetNumber: 123,
  complement: '',
  city: 'city',
  neighborhood: 'neighborhood',
  state: 'state'
};
const input = {
  fullName: 'fullName',
  responsibleCPF: 12312312300,
  hasCNPJ: true,
  cpfcnpj: 12312312312300,
  hasAcceptedTerms: true,
  contact, address
};

beforeEach(async () => {
  sequelize = await instanceSequelizeSQLite3();
  registerPersonRepository = new RegisterPersonRepository(sequelize);
  registerPersonHandler = new RegisterPersonHandler(registerPersonRepository);
});
afterEach(async () => await sequelize.close());

describe('success', () => {
  test('create person', async () => {
    const result = await registerPersonHandler.execute(input);
    expect(result.id).toBeTruthy();
    expect(result.fullName).toEqual(input.fullName);
    expect(result.responsibleCPF).toEqual(input.responsibleCPF);
    expect(result.hasCNPJ).toEqual(input.hasCNPJ);
    expect(result.cpfcnpj).toEqual(input.cpfcnpj);
    expect(result.hasAcceptedTerms).toEqual(input.hasAcceptedTerms);
    expect(result.contact).toEqual(contact);
    expect(result.address).toEqual(address);
  });
});

describe('fail', () => {
  test('create person with same email', async () => {
    await registerPersonHandler.execute(input);
    await expect(() => registerPersonHandler.execute(input))
      .rejects
      .toThrow('cpfcnpj must be unique');
  });
});
