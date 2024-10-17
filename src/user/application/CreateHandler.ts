import User from '../entity/User';
import IUserRepository from '../repository/UserRepository.interface';
import { createHash } from 'crypto';

type TInput = { 
  username: string;
  password: string;
  status?: boolean;
};

type TOutput = { 
  id: string;
  username: string;
  status: boolean;
};

class CreateHandler {
  constructor(private userRepository: IUserRepository){}

  async execute(input: TInput): Promise<TOutput>{
    try{
      if(!input.password) throw new Error('password must be provided');
      const id = crypto.randomUUID();
      const status = input.status ? input.status : true;
      const password = createHash('sha512')
        .update(input.password)
        .digest('hex');
      const user = new User({ ...input, id, status, password });
      const _user = await this.userRepository.create(user);
      const result: TOutput = {
        id: _user.id,
        username: _user.username,
        status: _user.status!
      };
      return result;
    }catch(err: any){
      throw new Error(err?.message);
    }
  }
}

export default CreateHandler;
