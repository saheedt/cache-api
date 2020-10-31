import { Request, Response } from 'express';
import { Cache } from '../database/model/cache';
import { NotFoundError } from '../errors';
import { Helper, constants } from '../utils';

const { generateKey, computeTTL } = Helper;
const { statusCodes } = constants;

export default class CacheController {
  async fetchCacheItem(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const cacheItem = await Cache.findOne({ key });
      const expired = cacheItem?.isExceededTTL();
      if (expired) {
        const ttl = computeTTL();
        const newCaheItem = Cache.build({
          key,
          ttl,
        });
        return res.status(statusCodes.Created).send({ cache: newCaheItem });
      }
      res.send({ cache: cacheItem });
    } catch (error) {
      throw error;
    }
  }

  async fetchAllCache(req: Request, res: Response) {
    try {
      const caches = await Cache.find();
      if (!caches) {
        throw new NotFoundError('Not records found');
      }
      res.status(statusCodes.OK).send({ caches });
    } catch (error) {
      throw error;
    }
  }
  async createCacheItem(req: Request, res: Response) {
    try {
      const { team, country } = req.body;
      const key = generateKey();
      const ttl = computeTTL();
      const newCacheitem = Cache.build({
        key,
        data: { team, country },
        ttl,
      });
      await newCacheitem.save();
      res.status(statusCodes.Created).send({ cache: newCacheitem });
    } catch (error) {
      throw error;
    }
  }
}
