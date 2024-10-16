import Person from "./Person";

let person: Person;

const input = {
  id: 'id',
  fullName: 'fullName',
  cpf: 12312312300,
  hasCNPJ: true,
  cnpj: 12312312312300,
  hasAcceptedTerms: true
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

