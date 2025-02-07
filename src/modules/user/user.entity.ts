import { user } from '@prisma/client';

export class UserEntity implements user {
  id: string;
  full_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
