import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { app } from './app';
import { constants } from './utils/';

dotenv.config();

const { Radix } = constants;

const port = normalizePort(process.env.PORT!);

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined.');
  }
  if (!process.env.TTL) {
    throw new Error('TTL must be defined.');
  }
  if (!process.env.MAX_CACHE_ITEMS) {
    throw new Error('MAX_CACHE_ITEMS must be defined.');
  }

  try {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to mongoDb');
  } catch (err) {
    console.error(err);
  }
};

app.listen(port, () => {
  console.log(`Listening on Port ${port}!!!`);
});

start();

function normalizePort(portNumber: string): number {
  const defaultPortNumber = 5000;

  const parsedPortNumber = parseInt(portNumber, Radix.Ten);

  if (Number.isNaN(parsedPortNumber)) {
    return defaultPortNumber;
  }

  if (parsedPortNumber > 0) {
    return parsedPortNumber;
  }
  return defaultPortNumber;
}
