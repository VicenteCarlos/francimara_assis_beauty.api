import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { JWTAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { RedisService } from 'src/redis/redis.service';

@Controller('/users')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Get('/my-infos')
  public async myInfos(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
