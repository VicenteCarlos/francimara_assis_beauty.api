import { users } from '@prisma/client';

export class UserEntity implements users {
  id: string;
  full_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
