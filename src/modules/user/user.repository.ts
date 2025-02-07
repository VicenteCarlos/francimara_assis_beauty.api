import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { IRepository } from 'src/common/interfaces/irepository';
import { Repository } from 'src/common/repository/repository.generic';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository
  extends Repository<user>
  implements IRepository<user>
{
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  public async getByEmail({ email }: { email: string }) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
