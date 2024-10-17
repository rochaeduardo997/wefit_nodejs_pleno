import { Table, Model, PrimaryKey, Column, Unique, HasOne } from 'sequelize-typescript';
import ContactModel from './ContactModel.model';
import AddressModel from './AddressModel.model';

@Table({ tableName: 'persons', timestamps: false })
class PersonModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare full_name: string;

  @Column
  declare responsible_cpf: string;

  @Column({ allowNull: false })
  declare has_cnpj: boolean;

  @Unique
  @Column
  declare cpfcnpj: string;

  @Column({ allowNull: false })
  declare has_accepted_terms: boolean;

  @HasOne(() => ContactModel, 'fk_person_id')
  declare contact?: ContactModel;

  @HasOne(() => AddressModel, 'fk_person_id')
  declare address?: AddressModel;
}

export default PersonModel;
