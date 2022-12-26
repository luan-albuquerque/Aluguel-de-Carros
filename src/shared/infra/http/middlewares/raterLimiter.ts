
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '@shared/errors/AppError';
import Redis from 'ioredis';


const redisClient = new Redis({ enableOfflineQueue: false });
 
const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5,
    duration: 5
})


export default async function rateLimiter(request: Request, reponse: Response, next: NextFunction){
    try {
        await limiter.consume(request.ip);

        return next()
    } catch (error) {
        throw new AppError("Too many requests", 429);
        
    }

}