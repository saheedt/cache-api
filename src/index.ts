import dotenv from 'dotenv';

import { app } from './app';
import { Radix } from './utils/constants';

dotenv.config();

const port = normalizePort(process.env.PORT!);

app.listen(port, () => {
  console.log(`Listening on Port ${port}!!!`);
});

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
