import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import IRegisterPersonRepository from '../../../register_person/repository/RegisterPersonRepository.interface';
import Person from '../../../register_person/entity/Person';
import Contact from '../../../register_person/value-object/Contact';
import Address from '../../../register_person/value-object/Address';
import PersonModel from './PersonModel.model';
import ContactModel from './ContactModel.model';
import AddressModel from './AddressModel.model';

class RegisterPersonRepository implements IRegisterPersonRepository {
  private PERSON_MODEL;

  constructor(private sequelize: Sequelize){
    this.PERSON_MODEL = PersonModel;
  }

  async create(input: Person): Promise<Person> {
    const transaction = await this.sequelize.transaction();
    try{
      const person = (await this.PERSON_MODEL.create({
        id: input.id,
        full_name: input.fullName,
        responsible_cpf: input.responsibleCPF,
        has_cnpj: input.hasCNPJ,
        cpfcnpj: input.cpfcnpj,
        has_accepted_terms: input.hasAcceptedTerms,
        contact: {
          cellphone: input.contact.cellphone,
          telephony: input.contact.telephony,
          email: input.contact.email,
          fk_person_id: input.id
        },
        address: {
          zipcode: input.address.zipcode,
          street: input.address.street,
          street_number: input.address.streetNumber,
          complement: input.address.complement,
          city: input.address.city,
          neighborhood: input.address.neighborhood,
          state: input.address.state,
          fk_person_id: input.id
        }
      }, { raw: true, include: [
        { model: ContactModel },
        { model: AddressModel }
      ], transaction })).dataValues;

      const result = new Person({
        ...person,
        fullName: person.full_name,
        responsibleCPF: person.responsible_cpf,
        hasCNPJ: person.has_cnpj,
        hasAcceptedTerms: person.has_accepted_terms,
        contact: new Contact({
          cellphone: person.contact.dataValues.cellphone,
          telephony: person.contact.dataValues.telephony,
          email: person.contact.dataValues.email
        }),
        address: new Address({
          zipcode: person.address.dataValues.zipcode,
          street: person.address.dataValues.street,
          streetNumber: person.address.dataValues.street_number,
          complement: person.address.dataValues.complement,
          city: person.address.dataValues.city,
          neighborhood: person.address.dataValues.neighborhood,
          state: person.address.dataValues.state
        })
      });
      await transaction.commit();
      return result;
    }catch(err: any){
      await transaction.rollback();
      console.error(err);
      throw new Error(err?.errors?.[0]?.message || 'failed on create new person');
    }
  }
}

export default RegisterPersonRepository
