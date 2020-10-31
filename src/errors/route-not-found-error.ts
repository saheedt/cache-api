import { CustomError } from './custom-error';
import { statusCode } from '../utils/constants';

export class RouteNotFoundError extends CustomError {
  statusCode = statusCode.NotFound;
  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Route Not Found' }];
  }
}
