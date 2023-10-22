import Redis from 'ioredis';
import superjson from 'superjson';

class RedisStore {
  #redis: Redis;
  static #instance: RedisStore;
  constructor() {
    this.#redis = new Redis(import.meta.env.REDIS_URL);
  }

  static get store() {
    if (!RedisStore.#instance) {
      RedisStore.#instance = new RedisStore();
    }
    return RedisStore.#instance;
  }
}
