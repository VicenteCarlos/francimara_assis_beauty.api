import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

@Injectable()
export class UserTransform {
  collection(users: users[]) {
    return users.map((user) => this.transform(user));
  }

  transform({ id, full_name }: users) {
    return {
      id,
      full_name,
    };
  }
}
