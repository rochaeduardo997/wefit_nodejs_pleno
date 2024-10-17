import { Sequelize } from 'sequelize-typescript';
import User from '../../../user/entity/User';
import UserModel from './User.model';
import IUserRepository, { TLoginInput } from '../../../user/repository/UserRepository.interface';
import { Op } from 'sequelize';

class UserRepository implements IUserRepository {
  private USER_MODEL;

  constructor(private sequelize: Sequelize){
    this.USER_MODEL = UserModel;
  }

  async login(input: TLoginInput): Promise<User> {
    try{
      const user = await this.USER_MODEL
        .findOne({ where: { username: input.login }});
      if(!user) throw new Error(`user ${input.login} not found`);
      const passwordMatch = user?.password === input.password;
      if(!passwordMatch) throw new Error('incorrect password');
      return new User({ ...user.dataValues });
    }catch(err: any){
      console.error(err);
      throw new Error('incorrect login/password');
    }
  }

  async create(input: User): Promise<User> {
    try{
      const result = (await this.USER_MODEL.create({
        id:       input.id,
        username: input.username,
        password: input.password,
        status:   input.status
      }, { raw: true })).dataValues;
      return new User({ ...result });
    }catch(err: any){
      console.error(err);
      throw new Error(err?.errors?.[0]?.message || 'failed on create new user');
    }
  }
}

export default UserRepository;
