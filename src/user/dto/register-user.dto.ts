import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
export class RegisterUserDto {
  @IsString()
  full_name?: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
