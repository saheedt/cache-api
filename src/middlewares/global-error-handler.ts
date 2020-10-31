import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { constants } from '../utils/';

const { statusCodes } = constants;

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  res
    .status(statusCodes.InternalServerError)
    .send({ errors: [{ message: 'something went wrong' }] });
};

export default globalErrorHandler;
