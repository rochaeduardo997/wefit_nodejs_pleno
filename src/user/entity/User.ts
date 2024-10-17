type TInput = {
  id: string; 
  username: string; 
  password: string; 
  status: boolean; 
};

class User {
  constructor(private input: TInput){}

  get id() { return this.input.id; }
  get username() { return this.input.username; }
  get password() { return this.input.password; }
  get status() { return this.input.status; }
}

export default User;
