import { Injectable } from '@nestjs/common';
import { makes } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { MakeEntity } from './makes.entity';

@Injectable()
export class MakesTransform {
  collection(makes: makes[]) {
    return makes.map((user) => this.transform(user));
  }

  transform(makes: makes) {
    const { schedules, id, name, price } = plainToInstance(MakeEntity, makes);

    return { schedules, id, name, price };
  }
}
