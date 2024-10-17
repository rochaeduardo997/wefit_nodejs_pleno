import { Table, Model, PrimaryKey, Column, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import PersonModel from './PersonModel.model';

@Table({ tableName: 'person_addresses', timestamps: false })
class AddressModel extends Model {
  @Column({ allowNull: false })
  declare zipcode: number;

  @PrimaryKey
  @Column({ allowNull: false })
  declare street: string;

  @PrimaryKey
  @Column({ allowNull: false })
  declare street_number: number;

  @Column
  declare complement: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare neighborhood: string;

  @Column({ allowNull: false })
  declare state: string;

  @PrimaryKey
  @ForeignKey(() => PersonModel)
  @Column({ allowNull: false })
  declare fk_person_id: string;

  @BelongsTo(() => PersonModel)
  declare person: PersonModel;
}

export default AddressModel;
