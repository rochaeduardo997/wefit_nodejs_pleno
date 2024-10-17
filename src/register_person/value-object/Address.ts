type TInput = {
  zipcode: number;
  street: string;
  streetNumber: number;
  complement?: string;
  city: string;
  neighborhood: string;
  state: string;
};

class Address {
  constructor(private input: TInput){ this.isValid(); }

  get zipcode() { return this.input.zipcode; }
  get street() { return this.input.street; }
  get streetNumber() { return this.input.streetNumber; }
  get complement() { return this.input.complement; }
  get city() { return this.input.city; }
  get neighborhood() { return this.input.neighborhood; }
  get state() { return this.input.state; }

  private isValid() {
    if(!this.input.zipcode) throw new Error('zipcode must be provided');
    if(!this.input.street) throw new Error('street must be provided');
    if(!this.input.streetNumber) throw new Error('street number must be provided');
    if(!this.input.city) throw new Error('city must be provided');
    if(!this.input.neighborhood) throw new Error('neighborhood must be provided');
    if(!this.input.state) throw new Error('state must be provided');
  }
}

export default Address;
