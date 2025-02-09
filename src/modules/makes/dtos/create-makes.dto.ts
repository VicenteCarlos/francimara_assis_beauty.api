import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMakeDTO {
  @IsString({ message: 'name must be string' })
  @IsNotEmpty({ message: 'name not empty' })
  name: string;

  @IsNumber({}, { message: 'price must be string' })
  @IsNotEmpty({ message: 'price not empty' })
  price: string;
}
