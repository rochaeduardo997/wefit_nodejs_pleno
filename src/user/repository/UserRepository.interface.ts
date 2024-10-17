import User from "../entity/User";

export type TLoginInput = { login: string, password: string };

interface IUserRepository {
  login(input: TLoginInput): Promise<User>;
  create(input: User): Promise<User>;
  upsertMainUser(input: User): Promise<void>;
};

export default IUserRepository;
