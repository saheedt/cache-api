import express from 'express';
import { checkSchema } from 'express-validator';
import { validations, validateRequest } from '../../../middlewares';
import { CacheController } from '../../../controllers';

const router = express.Router();

const { cacheValidations } = validations;
const { fetchCacheItemSchema, createCacheItemSchema } = cacheValidations;

const {
  fetchCacheItem,
  createCacheItem,
  fetchAllCache,
} = new CacheController();

router.get(
  '/cache/:key',
  checkSchema(fetchCacheItemSchema),
  validateRequest,
  fetchCacheItem
);

router.get('/cache', fetchAllCache);

router.post(
  '/cache',
  checkSchema(createCacheItemSchema),
  validateRequest,
  createCacheItem
);

export { router as cacheRouter };
