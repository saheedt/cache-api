import dotenv from 'dotenv';

dotenv.config();

const MAX_CACHE_ITEMS = parseInt(process.env.MAX_CACHE_ITEMS!, 10);
const TTL = Number.parseInt(process.env.TTL!, 10);

const config = { MAX_CACHE_ITEMS, TTL };

export default config;
