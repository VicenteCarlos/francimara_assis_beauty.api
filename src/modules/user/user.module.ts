import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JWTAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { UserController } from './user.controller';
import { JWTAuthStrategy } from 'src/guards/jwt/jwt-auth.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserTransform } from './user.transform';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PrismaService,
    UserTransform,
    RedisService,
    JWTAuthGuard,
    JWTAuthStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
