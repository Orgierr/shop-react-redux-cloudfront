export class InternalServerError extends Error {
  errorRes: ErrorRes;
  constructor() {
    super();
    this.errorRes = { statusCode: 500, body: "Internal Server Error" };
    this.name = this.constructor.name;
  }
}
