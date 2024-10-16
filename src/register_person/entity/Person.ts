import Contact from '../value-object/Contact';
import Address from '../value-object/Address';

type TInput = {
  id: string;
  fullName: string;
  cpf: number;
  hasCNPJ: boolean;
  cnpj?: number;
  hasAcceptedTerms: boolean;
  contact: Contact;
  address: Address;
};

class Person {
  constructor(private input: TInput){
    this.isValid();
  }

  get id() { return this.input.id; }
  get fullName() { return this.input.fullName; }
  get cpf() { return this.input.cpf; }
  get hasCNPJ() { return this.input.hasCNPJ; }
  get cnpj() { return this.input.cnpj; }
  get hasAcceptedTerms() { return this.input.hasAcceptedTerms; }
  get contact() { return this.input.contact; }
  get address() { return this.input.address; }

  private isValid(){
    const fullNameLengthLessThan5 = this.input.fullName.length < 5;
    const invalidCPFLength =
      (this.input.cpf + '').length < 11 ||
      (this.input.cpf + '').length > 11;
    const invalidCNPJLength =
      (this.input.cnpj + '').length < 14 ||
      (this.input.cnpj + '').length > 14;

    if(!this.input.hasCNPJ) this.input.cnpj = undefined;
    else if(invalidCNPJLength) throw new Error('invalid cnpj length');
    if(fullNameLengthLessThan5) throw new Error('full name must have 5 characters or more');
    if(invalidCPFLength) throw new Error('invalid cpf length');
  }
}

export default Person;

