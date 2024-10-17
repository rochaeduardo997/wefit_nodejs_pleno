import ICache from "./cache.interface";
import { createClient, RedisClientType } from 'redis';

class RedisAdapter implements ICache {
  private client: RedisClientType;

  constructor(){
    const username = process.env.CACHE_USER;
    const password = process.env.CACHE_PASSWORD;
    const host     = process.env.CACHE_HOST;
    const port     = process.env.CACHE_PORT;
    const url = `redis://${username}:${password}@${host}:${port}`;

    this.client = createClient({ url });
  }

  async connect(): Promise<void>{
    this.client.on('error', err => console.log('Redis Client Error', err));
    await this.client.connect();
    return;
  }

  async get(key: string): Promise<string> {
    try{
      const result = await this.client.get(key) || '';
      return result;
    }catch(err: any){
      throw new Error(`failed on redis get by key ${key}`);
    }
  }

  async set(key: string, value: string, expiresIn?: number): Promise<boolean> {
    try{
      await this.client.set(key, value, { EX: expiresIn });
      return true;
    }catch(err: any){
      throw new Error(`failed on redis set by key ${key}`);
    }
  }
}

export default RedisAdapter;
