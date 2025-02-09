import { makes, schedule } from '@prisma/client';

export class MakeEntity implements makes {
  id: number;
  name: string;
  price: number;
  password: string;
  schedules: schedule[];
  created_at: Date;
  updated_at: Date;
}
