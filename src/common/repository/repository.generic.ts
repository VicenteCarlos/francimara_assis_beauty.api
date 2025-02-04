import { IGenericProps, IRepository } from 'src/common/interfaces/irepository';
import { PrismaService } from 'src/prisma/prisma.service';

export abstract class Repository<T, K> implements IRepository<T, K> {
  constructor(protected readonly prisma: PrismaService) {}

  public async getAll({
    table,
    orderBy,
    include,
    select,
    where,
  }: IGenericProps<T, K>): Promise<T[]> {
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
  }: IGenericProps<T, K>): Promise<T | null> {
    console.log(where);
    return await this.prisma[table].findUnique({
      where,
    });
  }

  public async getById({ table, id, include }: IGenericProps<T, K>) {
    if (table === 'account') {
      return await this.prisma.account.findUnique({
        where: {
          b_account_id: id,
        },
        include: include ? include : [],
      });
    }
    return await this.prisma[table].findUnique({
      where: {
        [`${table[table.length - 1].toLowerCase() === 's'.toLowerCase() ? table.slice(0, table.length - 1) : table}_id`]:
          id,
      },
      include: include ? include : [],
    });
  }

  public async create({
    table,
    data,
    select,
  }: IGenericProps<T, K>): Promise<T> {
    return await this.prisma[table].create({
      data,
      select: select ? select : [],
    });
  }

  public async update({
    table,
    data,
    select,
  }: IGenericProps<T, K>): Promise<T> {
    return await this.prisma[table].update({
      where: {
        [`${table[table.length - 1].toLowerCase() === 's'.toLowerCase() ? table.slice(0, table.length - 1) : table}_id`]:
          data[
            `${table[table.length - 1].toLowerCase() === 's'.toLowerCase() ? table.slice(0, table.length - 1) : table}_id`
          ],
      },
      data,
      select: select ? select : [],
    });
  }

  public async delete({
    table,
    data,
    select,
  }: IGenericProps<T, K>): Promise<T> {
    return await this.prisma[table].delete({
      where: {
        [`${table[table.length - 1].toLowerCase() === 's'.toLowerCase() ? table.slice(0, table.length - 1) : table}_id`]:
          data[
            `${table[table.length - 1].toLowerCase() === 's'.toLowerCase() ? table.slice(0, table.length - 1) : table}_id`
          ],
      },
      select: select ? select : [],
    });
  }

  public async count({ table, where }: IGenericProps<T, K>): Promise<T | null> {
    return await this.prisma[table].count({
      where,
    });
  }
}
