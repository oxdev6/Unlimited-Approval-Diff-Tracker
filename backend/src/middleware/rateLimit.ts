import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { config } from '../config';

const limiter = new RateLimiterMemory({
  points: config.rateLimit.max,
  duration: config.rateLimit.windowMs / 1000
});

export async function rateLimit(req: Request, res: Response, next: NextFunction) {
  try {
    await limiter.consume(req.ip);
    next();
  } catch {
    res.status(429).json({ error: 'Too Many Requests' });
  }
}
