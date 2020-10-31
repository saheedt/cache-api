import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
import { constants } from '../utils/';

const { statusCodes } = constants;

export class RequestValidationError extends CustomError {
  statusCode = statusCodes.BadRequest;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Required to set prototype to current class prototype
    // as a built-in class is being extended
    Object.setPrototypeOf(this, RequestValidationError.prototype);

    // This limits stack trace depth
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
