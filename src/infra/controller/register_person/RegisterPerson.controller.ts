import IRegisterPersonRepository from '../../../register_person/repository/RegisterPersonRepository.interface';
import CreateHandler from '../../../register_person/application/RegisterPersonHandler';
import IHttp from '../../http/http.interface';

type TRouteResponse = { statusCode: number, result: any }

/**
 * @swagger
 *  tags:
 *    name: Persons
*/

class RegisterPersonRepository {
  constructor(httpAdapter: IHttp, private rpRepository: IRegisterPersonRepository){
    const BASE_URL_PATH = '/person';

    httpAdapter.addRoute('post', `${BASE_URL_PATH}`, this.CreateRoute.bind(this));

    console.log('api person controller successful loaded');
  }

    /**
     * @swagger
     * /api/v1/person:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     summary: Create a new person(seller or customer)
     *     tags: [Persons]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Register_Person_Body'
     *     responses:
     *       201:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Register_Person_Response'
     */
  private async CreateRoute(req: any, res: any): Promise<TRouteResponse>{
    try{
      const createHandler = new CreateHandler(this.rpRepository);
      const result = await createHandler.execute(req.body);
      return { statusCode: 201, result };
    }catch(err: any){
      console.error('failed on route: person create, ', err);
      throw new Error(err.message);
    }
  }
}

export default RegisterPersonRepository;
