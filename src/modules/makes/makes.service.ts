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
      const makes = this.makeTransformer.collection(JSON.parse(allMakeInCache));

      return {
        makes,
      };
    }

    const allMakes = await this.makeRepository.getAll({
      table: 'makes',
      include: {
        schedules: true,
      },
    });

    await this.redisService.set('makes', JSON.stringify(allMakes), 3605);

    return {
      makes: this.makeTransformer.collection(allMakes),
    };
  }
}
