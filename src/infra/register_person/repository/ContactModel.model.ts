import { DataType, Table, Model, PrimaryKey, Column, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import PersonModel from './PersonModel.model';

@Table({ tableName: 'person_contacts', timestamps: false })
class ContactModel extends Model {
  @Column({ allowNull: false, type: DataType.BIGINT })
  declare cellphone: number;

  @Column({ allowNull: false, type: DataType.BIGINT })
  declare telephony: number;

  @Unique
  @PrimaryKey
  @Column({ allowNull: false })
  declare email: string;

  @PrimaryKey
  @ForeignKey(() => PersonModel)
  @Column({ allowNull: false })
  declare fk_person_id: string;

  @BelongsTo(() => PersonModel)
  declare person: PersonModel;
}

export default ContactModel;
