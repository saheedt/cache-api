import { CustomError } from './custom-error';
import { constants } from '../utils/';

const { statusCodes } = constants;

export class NotFoundError extends CustomError {
  statusCode = statusCodes.NotFound;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
