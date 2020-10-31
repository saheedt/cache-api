import express from 'express';

import { cacheRouter } from './cache';

const router = express.Router();

router.use('/v1', cacheRouter);

export { router as v1Routes };
