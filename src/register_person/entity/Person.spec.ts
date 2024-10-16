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
  cpf: 12312312300,
  hasCNPJ: true,
  cnpj: 12312312312300,
  hasAcceptedTerms: true,
  contact, address
};

beforeEach(() => person = new Person(input));

describe('success', () => {
  test('create person with all fields', () => {
    const person = new Person(input);
    expect(person.id).toEqual(input.id);
    expect(person.fullName).toEqual(input.fullName);
    expect(person.cpf).toEqual(input.cpf);
    expect(person.hasCNPJ).toEqual(input.hasCNPJ);
    expect(person.cnpj).toEqual(input.cnpj);
    expect(person.hasAcceptedTerms).toEqual(input.hasAcceptedTerms);
    expect(person.contact).toEqual(input.contact);
    expect(person.address).toEqual(input.address);
  });

  test('create person without cnpj', () => {
    const person = new Person({ ...input, hasCNPJ: false });
    expect(person.hasCNPJ).toEqual(false);
    expect(person.cnpj).toBeUndefined();
  });
});

describe('fail', () => {
  test('create fullname less than 5', () => {
    expect(() => new Person({ ...input, fullName: 'qwer' }))
      .toThrow('full name must have 5 characters or more');
  });

  test('create cpf less than 11', () => {
    expect(() => new Person({ ...input, cpf: 1231231230 }))
      .toThrow('invalid cpf length');
  });

  test('create cpf greater than 11', () => {
    expect(() => new Person({ ...input, cpf: 123123123000 }))
      .toThrow('invalid cpf length');
  });

  test('create cnpj less than 14', () => {
    expect(() => new Person({ ...input, cnpj: 1231231231230 }))
      .toThrow('invalid cnpj length');
  });

  test('create cnpj greater than 14', () => {
    expect(() => new Person({ ...input, cnpj: 123123123123000 }))
      .toThrow('invalid cnpj length');
  });
});
