import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MakeController } from './makes.controller';
import { MakesRepository } from './makes.repository';
import { MakeService } from './makes.service';
import { RedisService } from 'src/redis/redis.service';
import { MakesTransform } from './makes.transform';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MakeController],
  providers: [
    MakeService,
    MakesTransform,
    MakesRepository,
    RedisService,
    PrismaService,
  ],
})
export class MakesModule {}
