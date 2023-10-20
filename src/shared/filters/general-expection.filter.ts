import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(err: Error | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();

    console.error(
      { err, request: _.pick(request, ['body', 'headers']) },
      `App exception occurs: ${err.message}`,
    );

    if (!!err && err instanceof HttpException) {
      return response.status(err.getStatus()).json(err.getResponse());
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
}
