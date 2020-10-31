import dotenv from 'dotenv';
import { constants } from '.';

const MAX_CACHE_ITEMS = parseInt(process.env.MAX_CACHE_ITEMS!, 10);

const config = { MAX_CACHE_ITEMS };

export default config;
