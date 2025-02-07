import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';

@Injectable()
export class UserTransform {
  collection(users: user[]) {
    return users.map((user) => this.transform(user));
  }

  transform({ id, full_name }: user) {
    return {
      id,
      full_name,
    };
  }
}
