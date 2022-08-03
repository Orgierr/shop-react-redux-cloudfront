import { caching } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';

export const redisClient = caching({
  store: redisStore,
  host: 'redis-12325.c300.eu-central-1-1.ec2.cloud.redislabs.com', // default value
  port: 12325, // default value
  password: 'XeruKlu6oD1e6BfbmNMFcqqSKxbQBO0B',
  db: 0,
  ttl: 120,
});
