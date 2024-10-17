import CreateHandler from "../../../user/application/CreateHandler";
import LoginHandler from "../../../user/application/LoginHandler";
import IUserRepository from "../../../user/repository/UserRepository.interface";
import ICache from "../../cache/cache.interface";
import IHttp from "../../http/http.interface";
import IJWT from "../../jwt/jwt.interface";

type TRouteResponse = { statusCode: number, result: any }

class UserController {
  constructor(httpAdapter: IHttp, private userRepository: IUserRepository, private cache: ICache, private jwt: IJWT){
    const BASE_URL_PATH = '/users';

    httpAdapter.addRoute('post', '/login', this.LoginRoute.bind(this));

    console.log('user controller successful loaded');
  }

  private async LoginRoute(req: any, res: any): Promise<TRouteResponse>{
    try{
      const loginHandler = new LoginHandler(this.userRepository, this.cache, this.jwt);
      const result = await loginHandler.execute(req.body);
      if(!result.status) throw new Error('disabled user');
      return { statusCode: 200, result };
    }catch(err: any){
      console.error('failed on route: user login, ', err);
      throw new Error(err.message);
    }
  }
}

export default UserController;
