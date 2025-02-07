import { IGenericProps, IRepository } from 'src/common/interfaces/irepository';
import { PrismaService } from 'src/prisma/prisma.service';

export abstract class Repository<T> implements IRepository<T> {
  constructor(protected readonly prisma: PrismaService) {}

  public async getAll({
    table,
    orderBy,
    include,
    select,
    where,
  }: IGenericProps<T>): Promise<T[]> {
    if (include) {
      return await this.prisma[table].findMany({
        orderBy: orderBy ? orderBy : [],
        include,
        where,
      });
    }

    return await this.prisma[table].findMany({
      orderBy: orderBy ? orderBy : [],
      select,
      where,
    });
  }

  public async findUnique({
    table,
    where,
  }: IGenericProps<T>): Promise<T | null> {
    return await this.prisma[table].findUnique({
      where,
    });
  }

  public async getById({ table, id, include }: IGenericProps<T>) {
    if (table === 'account') {
      return await this.prisma[table].findUnique({
        where: {
          b_account_id: id,
        },
        include: include ? include : [],
      });
    }
    return await this.prisma[table].findUnique({
      where: {
        id,
      },
      include: include ? include : [],
    });
  }

  public async create({
    table,
    data,
  }: IGenericProps<T>): Promise<T> {
    return await this.prisma[table].create({
      data,
    });
  }

  public async update({
    table,
    data,
    select,
  }: IGenericProps<T>): Promise<T> {
    return await this.prisma[table].update({
      where: {
        id: data['id'],
      },
      data,
      select: select ? select : [],
    });
  }

  public async delete({
    table,
    data,
    select,
  }: IGenericProps<T>): Promise<T> {
    return await this.prisma[table].delete({
      where: {
        id: data['id'],
      },
      select: select ? select : [],
    });
  }

  public async count({ table, where }: IGenericProps<T>): Promise<T | null> {
    return await this.prisma[table].count({
      where,
    });
  }
}
