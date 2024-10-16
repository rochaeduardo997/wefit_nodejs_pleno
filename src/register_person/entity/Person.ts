import Contact from '../value-object/Contact';
import Address from '../value-object/Address';

type TInput = {
  id: string;
  fullName: string;
  responsibleCPF: number;
  hasCNPJ: boolean;
  cpfcnpj: number;
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
  get responsibleCPF() { return this.input.responsibleCPF; }
  get hasCNPJ() { return this.input.hasCNPJ; }
  get cpfcnpj() { return this.input.cpfcnpj; }
  get hasAcceptedTerms() { return this.input.hasAcceptedTerms; }
  get contact() { return this.input.contact; }
  get address() { return this.input.address; }

  private isValid(){
    const fullNameLengthLessThan5 = this.input.fullName.length < 5;
    const invalidResponsibleCPFLength =
      (this.input.responsibleCPF + '').length < 11 ||
      (this.input.responsibleCPF + '').length > 11;

    this.validateCPFCNPJ();

    if(fullNameLengthLessThan5) throw new Error('full name must have 5 characters or more');
    if(invalidResponsibleCPFLength) throw new Error('invalid responsible cpf length');
  }

  private validateCPFCNPJ(){
    if(this.input.hasCNPJ) {
      const invalidCNPJLength =
        (this.input.cpfcnpj + '').length < 14 ||
        (this.input.cpfcnpj + '').length > 14;
      if(invalidCNPJLength) throw new Error('invalid cnpj length');
    }else{
      const invalidCPFLength =
        (this.input.cpfcnpj + '').length < 11 ||
        (this.input.cpfcnpj + '').length > 11;
      if(invalidCPFLength) throw new Error('invalid cpf length');
    }
  }
}

export default Person;

