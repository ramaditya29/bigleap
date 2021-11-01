import { Injectable, NestMiddleware, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
@Injectable()
export class AuthHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log('the headers are :', req.headers);
    Logger.log('the headers are:' , req.headers);
    if('authorization' in req.headers){
        next();
    } else
    throw new NotFoundException('Authorization header is missing');
  }
}
