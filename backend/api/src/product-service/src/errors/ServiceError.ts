import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ServiceRes } from '../types/service_res';

export class ServiceError extends Error {
  response: ServiceRes;
  constructor(response: ServiceRes) {
    super();
    this.response = response;
    this.name = this.constructor.name;
  }
  static errorResponse(error): ServiceRes {
    if (error instanceof ServiceError) return error.response;
    return new ServiceError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: ReasonPhrases.INTERNAL_SERVER_ERROR,
    }).response;
  }
}
