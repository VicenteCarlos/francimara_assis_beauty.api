import { HttpStatus, Injectable } from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from './dtos/user.dto';
import { AppError } from 'src/common/errors/app-error';
import { OperationErrors } from 'src/common/enums/enum';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { UserTransform } from 'src/modules/user/user.transform';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
    private readonly userTransform: UserTransform
  ) {}

  public async register({ full_name, email, password }: UserRegisterDTO) {
    await this.verifyByEmail({ email });

    await this.prismaService.users.create({
      data: { full_name, email, password },
    });

    return { message: 'User created' };
  }

  public async login({ email, password }: UserLoginDTO) {
    const user = await this.getByEmail({ email });

    const isMatched = await compare(password, user.password);

    if (!isMatched) {
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'Password incorrect',
        false,
      );
    }

    const tokenJwt = await this.jwtService.signAsync(
      { userId: user.id },
      { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '1h' },
    );

    const userTransformed = this.userTransform.transform(user)

    await this.redisService.sAdd('user:whitelist', user.id);
    await this.redisService.set(`user-${user.id}`, JSON.stringify(userTransformed), 3605)

    return {
      token: tokenJwt,
    };
  }

  private async getByEmail({ email }: { email: string }) {
    const findedEmail = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!findedEmail) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'E-mail not exists',
        false,
      );
    }

    return findedEmail;
  }

  private async verifyByEmail({ email }: { email: string }): Promise<void> {
    const findedEmail = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (findedEmail) {
      throw new AppError(
        OperationErrors.CONFLICT,
        HttpStatus.CONFLICT,
        'E-mail already exists',
        false,
      );
    }
  }
}
