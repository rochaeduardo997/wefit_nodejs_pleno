import ICache from '../../infra/cache/cache.interface';
import IJWT from '../../infra/jwt/jwt.interface';
import IUserRepository, { TLoginInput } from '../repository/UserRepository.interface';
import { createHash } from 'crypto';

type TOutput = { 
  id: string;
  username: string;
  status: boolean;
  token: string;
};

class LoginHandler {
  constructor(private userRepository: IUserRepository, private cache: ICache, private jwt: IJWT){}

  async execute(input: TLoginInput): Promise<TOutput>{
    try{
      const password = createHash('sha512')
        .update(input.password)
        .digest('hex');
      const user = await this.userRepository.login({ ...input, password });
      const toEncode = {
        id:       user.id,
        username: user.username,
        status:   user.status!
      };
      const token = this.jwt.sign(toEncode);
      const oneHourInSeconds = 3600;
      await this.cache.set(`session:${user.id}`, token, oneHourInSeconds);
      return { ...toEncode, token };
    }catch(err: any){
      throw new Error(err.message);
    }
  }
}

export default LoginHandler;
