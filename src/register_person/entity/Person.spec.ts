import Person from "./Person";
import Contact from "../value-object/Contact";
import Address from "../value-object/Address";

let person: Person;

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
  id: 'id',
  fullName: 'fullName',
  responsibleCPF: 12312312300,
  hasCNPJ: true,
  cpfcnpj: 12312312312300,
  hasAcceptedTerms: true,
  contact, address
};

beforeEach(() => person = new Person(input));

describe('success', () => {
  test('create person with all fields', () => {
    const person = new Person(input);
    expect(person.id).toEqual(input.id);
    expect(person.fullName).toEqual(input.fullName);
    expect(person.responsibleCPF).toEqual(input.responsibleCPF);
    expect(person.hasCNPJ).toEqual(input.hasCNPJ);
    expect(person.cpfcnpj).toEqual(input.cpfcnpj);
    expect(person.hasAcceptedTerms).toEqual(input.hasAcceptedTerms);
    expect(person.contact).toEqual(input.contact);
    expect(person.address).toEqual(input.address);
  });
});

describe('fail', () => {
  test('create fullname less than 5', () => {
    expect(() => new Person({ ...input, fullName: 'qwer' }))
      .toThrow('full name must have 5 characters or more');
  });

  test('create responsible cpf less than 11', () => {
    expect(() => new Person({ ...input, responsibleCPF: 1231231230 }))
      .toThrow('invalid responsible cpf length');
  });

  test('create responsible cpf greater than 11', () => {
    expect(() => new Person({ ...input, responsibleCPF: 123123123000 }))
      .toThrow('invalid responsible cpf length');
  });

  test('create cnpj less than 14', () => {
    expect(() => new Person({ ...input, cpfcnpj: 1231231231230 }))
      .toThrow('invalid cnpj length');
  });

  test('create cnpj greater than 14', () => {
    expect(() => new Person({ ...input, cpfcnpj: 123123123123000 }))
      .toThrow('invalid cnpj length');
  });

  test('create cpf less than 11', () => {
    expect(() => new Person({ ...input, hasCNPJ: false, cpfcnpj: 1231231230 }))
      .toThrow('invalid cpf length');
  });

  test('create cpf greater than 11', () => {
    expect(() => new Person({ ...input, hasCNPJ: false, cpfcnpj: 123123123000 }))
      .toThrow('invalid cpf length');
  });
});
