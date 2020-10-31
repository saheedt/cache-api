import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from './middlewares';
import { RouteNotFoundError } from './errors';

const app = express();

app.use(json());

app.all('*', (req: Request, res: Response) => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

export { app };
