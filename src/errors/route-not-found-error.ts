import { CustomError } from './custom-error';
import { constants } from '../utils/';

const { statusCodes } = constants;

export class RouteNotFoundError extends CustomError {
  statusCode = statusCodes.NotFound;
  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Route Not Found' }];
  }
}
