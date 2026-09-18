import {Request , Response ,NextFunction } from 'express'

//logger middleware (helpls debug and monitor the server activity and understand theflow of traffic)
export const loggerMiddleware = (req: Request , res:Response , next:NextFunction) => {
    console.log('[$(new Date().toString()] $(req.method) $(req.url)');
    next()
}

