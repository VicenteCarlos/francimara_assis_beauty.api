import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserTransform } from './user.transform';
import { AppError } from 'src/common/errors/app-error';
import { OperationErrors } from 'src/common/enums/enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userTransform: UserTransform,
    private readonly userRepository: UserRepository,
  ) {}

  public async getAll() {
    const allUsers = await this.userRepository.getAll({ table: 'user' });

    return this.userTransform.collection(allUsers);
  }

  public async getById({ id }: { id: string }) {
    const user = await this.userRepository.findUnique({
      table: 'user',
      where: { id },
    });

    if (!user) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'User not found',
        false,
      );
    }

    return this.userTransform.transform(user);
  }
}
