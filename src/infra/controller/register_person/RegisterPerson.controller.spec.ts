import { Sequelize } from 'sequelize-typescript';
import supertest from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { instanceSequelizeSQLite3 } from '../../../infra/db/sequelize/instance';
import IRegisterPersonRepository from '../../../register_person/repository/RegisterPersonRepository.interface';
import RegisterPersonRepository from '../../register_person/repository/RegisterPerson.repository';
import RegisterPersonController from './RegisterPerson.controller';
import ExpressAdapter from '../../http/ExpressAdapter';
import RegisterPersonHandler from '../../../register_person/application/RegisterPersonHandler';
import * as dotenv from 'dotenv';
dotenv.config();

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
let request: TestAgent;
let sequelize: Sequelize;
let rpRepository: IRegisterPersonRepository;
let rpHandler: RegisterPersonHandler;

beforeEach(async () => {
  sequelize = await instanceSequelizeSQLite3();
  rpRepository = new RegisterPersonRepository(sequelize);
  const httpAdapter = new ExpressAdapter();
  new RegisterPersonController(httpAdapter, rpRepository);
  httpAdapter.init();
  request = supertest(httpAdapter.app);
  rpHandler = new RegisterPersonHandler(rpRepository);
});
afterEach(() => sequelize.close());

describe('success', () => {
  test('create person', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send(input);
    expect(body?.result?.id).toBeTruthy();
    expect(body?.result?.fullName).toEqual(input.fullName);
    expect(body?.result?.responsibleCPF).toEqual(input.responsibleCPF);
    expect(body?.result?.hasCNPJ).toEqual(input.hasCNPJ);
    expect(body?.result?.cpfcnpj).toEqual(input.cpfcnpj);
    expect(body?.result?.hasAcceptedTerms).toEqual(input.hasAcceptedTerms);
    expect(body?.result?.contact).toEqual(contact);
    expect(body?.result?.address).toEqual(address);
    expect(status).toEqual(201);
  });
});


describe('fail', () => {
  test('create person with same email', async () => {
    await rpHandler.execute(input);
    const { status, body } = await request
      .post('/api/v1/person')
      .send(input);
    expect(body?.msg).toEqual('cpfcnpj must be unique');
    expect(status).toEqual(400);
  });

  test('create person without address zipcode', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, address: { ...address, zipcode: undefined }});
    expect(body?.msg).toEqual('zipcode must be provided');
    expect(status).toEqual(400);
  });

  test('create person without address street', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, address: { ...address, street: undefined }});
    expect(body?.msg).toEqual('street must be provided');
    expect(status).toEqual(400);
  });

  test('create person without address street number', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, address: { ...address, streetNumber: undefined }});
    expect(body?.msg).toEqual('street number must be provided');
    expect(status).toEqual(400);
  });

  test('create person without address city', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, address: { ...address, city: undefined }});
    expect(body?.msg).toEqual('city must be provided');
    expect(status).toEqual(400);
  });

  test('create person without address neighborhood', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, address: { ...address, neighborhood: undefined }});
    expect(body?.msg).toEqual('neighborhood must be provided');
    expect(status).toEqual(400);
  });

  test('create person without address state', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, address: { ...address, state: undefined }});
    expect(body?.msg).toEqual('state must be provided');
    expect(status).toEqual(400);
  });

  test('create person without contact cellphone', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, contact: { ...contact, cellphone: undefined }});
    expect(body?.msg).toEqual('cellphone must be provided');
    expect(status).toEqual(400);
  });

  test('create person without contact telephony', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, contact: { ...contact, telephony: undefined }});
    expect(body?.msg).toEqual('telephony must be provided');
    expect(status).toEqual(400);
  });

  test('create person without contact email', async () => {
    const { status, body } = await request
      .post('/api/v1/person')
      .send({ ...input, contact: { ...contact, email: undefined }});
    expect(body?.msg).toEqual('email must be provided');
    expect(status).toEqual(400);
  });
});

