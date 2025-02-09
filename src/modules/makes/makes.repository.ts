import { Injectable } from '@nestjs/common';
import { makes } from '@prisma/client';
import { IRepository } from 'src/common/interfaces/irepository';
import { Repository } from 'src/common/repository/repository.generic';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MakesRepository
  extends Repository<makes>
  implements IRepository<makes>
{
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }
}
