import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsEmail({}, { message: 'Invalid email' })
  @IsString({ message: 'email must be string' })
  @IsNotEmpty({ message: 'email not empty' })
  email: string;

  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password not empty' })
  password: string;
}

export class UserRegisterDTO {
  @IsString({ message: 'full_name must be string' })
  @IsNotEmpty({ message: 'full_name not empty' })
  full_name: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsString({ message: 'email must be string' })
  @IsNotEmpty({ message: 'email not empty' })
  email: string;

  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password not empty' })
  password: string;
}
