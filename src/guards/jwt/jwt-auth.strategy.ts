import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OperationErrors } from 'src/common/enums/enum';
import { AppError } from 'src/common/errors/app-error';
import { UserService } from 'src/modules/user/user.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JWTAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: { userId: string }) {
    const userIsAuthenticated = await this.redisService.sIsMember(
      'user:whitelist',
      userId,
    );

    if (userIsAuthenticated) {
      const user = await this.redisService.get(`user-${userId}`);

      return JSON.parse(user);
    }

    const user = await this.userService.getById({ id: userId });

    if (!user) {
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'User not exists',
        false,
      );
    }

    return user;
  }
}
