export class ProductNotFoundError extends Error {
  errorRes: ErrorRes;
  constructor() {
    super();
    this.errorRes = { statusCode: 404, body: "Product not found" };
    this.name = this.constructor.name;
  }
}
