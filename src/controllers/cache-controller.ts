import { Request, Response } from 'express';
import { Cache } from '../database/model/cache';
import { NotFoundError } from '../errors';
import { Helper, constants } from '../utils';

const { generateKey } = Helper;
const { statusCodes, config } = constants;

export default class CacheController {
  async fetchCacheItem(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const cacheItem = await Cache.findOne({ key });
      const expired = await cacheItem?.isExceededTTL();

      if (!cacheItem || expired) {
        console.log('cache miss');
        const newCaheItem = Cache.build({
          key,
          ttl: config.TTL,
        });
        await newCaheItem.save();
        return res.status(statusCodes.Created).send({ key: newCaheItem.key });
      }
      console.log('cache hit');
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
      const keys = caches.map((cache) => cache.key);
      res.status(statusCodes.OK).send({ keys });
    } catch (error) {
      throw error;
    }
  }
  async createCacheItem(req: Request, res: Response) {
    try {
      const { team, country } = req.body;
      const key = generateKey();
      const newCacheitem = Cache.build({
        key,
        data: { team, country },
        ttl: config.TTL,
      });
      await newCacheitem.save();
      res.status(statusCodes.Created).send({ cache: newCacheitem });
    } catch (error) {
      throw error;
    }
  }
  async updateCacheItem(req: Request, res: Response) {
    try {
      const { key, team, country } = req.body;

      const updateRecord = { data: { team, country } };

      const foundCache = await Cache.findOneAndUpdate(
        { key },
        { $set: updateRecord },
        { new: true, upsert: false }
      );
      if (!foundCache) {
        throw new NotFoundError('Item not found');
      }
      const updatedCache = await foundCache?.save();

      res.status(statusCodes.OK).send({ cache: updatedCache });
    } catch (error) {
      throw error;
    }
  }
  async deleteCacheItem(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const item = await Cache.findOneAndDelete({ key });
      if (!item) {
        throw new NotFoundError('Item specified for delete not found');
      }
      res.status(statusCodes.OK).send({ cache: item });
    } catch (error) {
      throw error;
    }
  }

  async deleteCacheItems(req: Request, res: Response) {
    try {
      const items = await Cache.deleteMany({});
      if (!items.deletedCount) {
        throw new NotFoundError('No items found to delete');
      }
      res.status(statusCodes.OK).send({ caches: [] });
    } catch (error) {
      throw error;
    }
  }
}
