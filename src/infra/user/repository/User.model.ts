import { Table, Model, PrimaryKey, Column, Unique, Default } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
class UserModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Unique
  @Column({ allowNull: false })
  declare username: string;

  @Column({ allowNull: false })
  declare password: string;

  @Column({ allowNull: false, defaultValue: true })
  declare status: boolean;
}

export default UserModel;
