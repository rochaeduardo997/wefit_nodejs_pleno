type TInput = {
  cellphone: number;
  telephony: number;
  email: string;
};

class Contact {
  constructor(private input: TInput){ this.isValid(); }

  get cellphone() { return this.input.cellphone; }
  get telephony() { return this.input.telephony; }
  get email() { return this.input.email; }

  private isValid(){
    if(!this.cellphone) throw new Error('cellphone must be provided');
    if(!this.telephony) throw new Error('telephony must be provided');
    if(!this.email) throw new Error('email must be provided');
  }
}

export default Contact;
