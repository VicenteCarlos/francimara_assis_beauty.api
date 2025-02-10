import { Injectable } from '@nestjs/common';
import { MakesRepository } from './makes.repository';
import { RedisService } from 'src/redis/redis.service';
import { MakesTransform } from './makes.transform';
import { Request } from 'express';

@Injectable()
export class MakeService {
  constructor(
    private readonly redisService: RedisService,
    private readonly makeRepository: MakesRepository,
    private readonly makeTransformer: MakesTransform,
  ) {}

  public async getAll(req: Request) {
    const allMakeInCache = await this.redisService.get(`makes`);

    if (allMakeInCache) {
      return {
        makes: JSON.parse(allMakeInCache),
      };
    }

    const allMakes = await this.makeRepository.getAll({
      table: 'makes',
      include: {
        schedules: true,
      },
    });

    const makeTransformed = this.makeTransformer.collection(allMakes);

    await this.redisService.set('makes', JSON.stringify(makeTransformed), 3605);

    return {
      makes: makeTransformed,
    };
  }
}
