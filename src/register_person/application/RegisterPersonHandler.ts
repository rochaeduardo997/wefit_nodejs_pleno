import IRegisterPersonRepository from '../repository/RegisterPersonRepository.interface';
import Person from '../entity/Person';
import Contact from '../value-object/Contact';
import Address from '../value-object/Address';

class CreateHandler {
  constructor(private rpRepository: IRegisterPersonRepository){}

  async execute(input: TInput): Promise<TOutput>{
    try{
      const id = crypto.randomUUID();
      const contact = new Contact({ ...input.contact });
      const address = new Address({ ...input.address });
      const person = await this.rpRepository.create(new Person({ ...input, id, address, contact }));
      const result: TOutput = {
        id: person.id,
        fullName: person.fullName,
        responsibleCPF: person.responsibleCPF,
        hasCNPJ: person.hasCNPJ,
        cpfcnpj: person.cpfcnpj,
        hasAcceptedTerms: person.hasAcceptedTerms,
        contact: {
          cellphone: input.contact.cellphone,
          telephony: input.contact.telephony,
          email: input.contact.email
        },
        address: {
          zipcode: input.address.zipcode,
          street: input.address.street,
          streetNumber: input.address.streetNumber,
          complement: input.address.complement,
          city: input.address.city,
          neighborhood: input.address.neighborhood,
          state: input.address.state
        }
      };
      return result;
    }catch(err: any){
      throw new Error(err?.message);
    }
  }
}

type TContact = { cellphone: number; telephony: number; email: string; };
type TAddress = {
  zipcode: number;
  street: string;
  streetNumber: number;
  complement?: string;
  city: string;
  neighborhood: string;
  state: string;
};
type TCommon = {
  fullName: string;
  responsibleCPF: number;
  hasCNPJ: boolean;
  cpfcnpj: number;
  hasAcceptedTerms: boolean;
  contact: TContact;
  address: TAddress;
};
type TInput  = TCommon&{};
type TOutput = TCommon&{id: string;};

export default CreateHandler;
