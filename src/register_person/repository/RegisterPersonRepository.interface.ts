import Person from '../entity/Person';

interface IRegisterPersonRepository {
  create(input: Person): Promise<Person>;
}

export default IRegisterPersonRepository;
