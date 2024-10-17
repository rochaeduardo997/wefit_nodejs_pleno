import User from '../entity/User';
import IUserRepository from '../repository/UserRepository.interface';
import { createHash } from 'crypto';

type TInput = { 
  username: string;
  password: string;
  status?: boolean;
};

class UpsertMainUserHandler {
  constructor(private userRepository: IUserRepository){}

  async execute(input: TInput): Promise<boolean>{
    try{
      if(!input.password) throw new Error('password must be provided');
      const id = crypto.randomUUID();
      const status = input.status ? input.status : true;
      const password = createHash('sha512')
        .update(input.password)
        .digest('hex');
      const user = new User({ ...input, id, status, password });
      await this.userRepository.upsertMainUser(user);
      return true;
    }catch(err: any){
      throw new Error(err?.message);
    }
  }
}

export default UpsertMainUserHandler;
