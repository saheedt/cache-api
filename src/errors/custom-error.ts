export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(messaage: string) {
    super(messaage);

    // Required to set prototype to current class prototype
    // as a built-in class is being extended
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
