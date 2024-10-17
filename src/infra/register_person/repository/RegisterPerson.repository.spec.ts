import { Sequelize } from 'sequelize-typescript';
import { instanceSequelizeSQLite3 } from '../../db/sequelize/instance';
import IRegisterPersonRepository from '../../../register_person/repository/RegisterPersonRepository.interface';
import RegisterPersonRepository from './RegisterPerson.repository';
import Person from '../../../register_person/entity/Person';
import Contact from '../../../register_person/value-object/Contact';
import Address from '../../../register_person/value-object/Address';
import * as dotenv from 'dotenv';
dotenv.config();

let sequelize:  Sequelize;
let registerPersonRepository: IRegisterPersonRepository;

const contact = new Contact({ cellphone: 11111111111, telephony: 11111111111, email: 'email@email.com' });
const address = new Address({
  zipcode: 11111111,
  street: 'street',
  streetNumber: 123,
  complement: '',
  city: 'city',
  neighborhood: 'neighborhood',
  state: 'state'
});
const input = {
  id: 'id1',
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
});
afterEach(async () => await sequelize.close());

describe('success', () => {
  test('create person', async () => {
    const person = new Person(input);
    const result = await registerPersonRepository.create(person);
    expect(result.id).toEqual(person.id);
    expect(result.fullName).toEqual(person.fullName);
    expect(result.responsibleCPF).toEqual(person.responsibleCPF);
    expect(result.hasCNPJ).toEqual(person.hasCNPJ);
    expect(result.cpfcnpj).toEqual(person.cpfcnpj);
    expect(result.hasAcceptedTerms).toEqual(person.hasAcceptedTerms);
    expect(result.contact).toEqual(person.contact);
    expect(result.address).toEqual(person.address);
  });
});

describe('fail', () => {
  test('create person with equal cpfcnpj', async () => {
    const person = new Person(input);
    await registerPersonRepository.create(person);
    await expect(() => registerPersonRepository.create(person))
      .rejects
      .toThrow('cpfcnpj must be unique');
  });

  test('create person with equal email', async () => {
    const person1 = new Person(input);
    const person2 = new Person({ ...input, id: 'id2', cpfcnpj: 22222222222222 });
    await registerPersonRepository.create(person1);
    await expect(() => registerPersonRepository.create(person2))
      .rejects
      .toThrow('email must be unique');
  });
});
