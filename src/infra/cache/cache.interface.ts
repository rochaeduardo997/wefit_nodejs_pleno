interface ICache {
  connect(): Promise<void>;
  get(key: string): Promise<string>;
  set(key: string, value: string, expiresIn?: number): Promise<boolean>;
}

export default ICache;
