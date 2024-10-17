import { Table, Model, PrimaryKey, Column, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import PersonModel from './PersonModel.model';

@Table({ tableName: 'person_contacts', timestamps: false })
class ContactModel extends Model {
  @Column({ allowNull: false })
  declare cellphone: number;

  @Column({ allowNull: false })
  declare telephony: number;

  @Unique
  @Column({ allowNull: false })
  declare email: string;

  @ForeignKey(() => PersonModel)
  @Column({ allowNull: false })
  declare fk_person_id: string;

  @BelongsTo(() => PersonModel)
  declare person: PersonModel;
}

export default ContactModel;
