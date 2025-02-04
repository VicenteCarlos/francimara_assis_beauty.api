import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class HashPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  async transform({ password, ...data }: { email: string; password: string }) {
    const salt = this.configService.get<string>('BCRYPT_SALT');

    const passwordHashed = await hash(password, salt);

    return {
      password: passwordHashed,
      ...data,
    };
  }
}
