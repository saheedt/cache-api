import { ParamSchema } from 'express-validator';

interface ValidationType {
  [s: string]: ParamSchema;
}

interface ValidationSchemaType {
  fetchCacheItemSchema: ValidationType;
  createCacheItemSchema: ValidationType;
  updateCacheItemSchema: ValidationType;
  deleteCacheItemSchema: ValidationType;
}

export const cacheValidations: ValidationSchemaType = {
  fetchCacheItemSchema: {
    key: {
      in: ['params'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item identification is required',
    },
  },
  createCacheItemSchema: {
    team: {
      in: ['body'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item team name is required',
    },
    country: {
      in: ['body'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item team country is required',
    },
  },
  updateCacheItemSchema: {
    key: {
      in: ['body'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item identifier is required',
    },
    team: {
      in: ['body'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item team name is required',
    },
    country: {
      in: ['body'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item team country is required',
    },
  },
  deleteCacheItemSchema: {
    key: {
      in: ['params'],
      notEmpty: true,
      isString: true,
      escape: true,
      trim: true,
      errorMessage: 'A valid cache item identifier is required',
    },
  },
};
