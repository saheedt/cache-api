import express from 'express';
import { checkSchema } from 'express-validator';
import { validations, validateRequest } from '../../../middlewares';
import { CacheController } from '../../../controllers';

const router = express.Router();

const { cacheValidations } = validations;
const {
  fetchCacheItemSchema,
  createCacheItemSchema,
  updateCacheItemSchema,
  deleteCacheItemSchema,
} = cacheValidations;

const {
  fetchCacheItem,
  createCacheItem,
  updateCacheItem,
  deleteCacheItem,
  fetchAllCache,
  deleteCacheItems,
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

router.put(
  '/cache',
  checkSchema(updateCacheItemSchema),
  validateRequest,
  updateCacheItem
);

router.delete(
  '/cache/:key',
  checkSchema(deleteCacheItemSchema),
  validateRequest,
  deleteCacheItem
);

router.delete('/cache', deleteCacheItems);

export { router as cacheRouter };
