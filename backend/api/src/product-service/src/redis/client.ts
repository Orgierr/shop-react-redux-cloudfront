import { caching } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';

export const redisClient = caching({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: 0,
  ttl: 120,
});
