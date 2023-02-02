import { IsNotEmpty } from 'class-validator';

export class EditUser {
  @IsNotEmpty()
  readonly first_name: string;
  readonly last_name: string;
  readonly nick_name: string;
  readonly email: string;
  readonly phone_number: string;
  readonly description: string;
  readonly position: string;
  readonly password: string;
}
