import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  readonly password: string;
}
