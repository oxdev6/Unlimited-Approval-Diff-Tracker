import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({ err }, 'Unhandled error');

  res.status(err.statusCode ?? 500).json({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'production' ? undefined : String(err.message ?? err)
  });
}
