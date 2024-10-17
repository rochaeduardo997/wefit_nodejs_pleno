import ICache from "./cache.interface";

class CacheFake implements ICache {
  private REGISTERS: { [t in string]: any } = {};

  async connect(): Promise<void> {}

  async get(key: string): Promise<string> {
    return this.REGISTERS[key];
  }

  async set(key: string, value: string, expiresIn?: number): Promise<boolean> {
    this.REGISTERS[key] = value;
    return true;
  }
}

export default CacheFake;
