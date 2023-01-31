import Role from '../models/role.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  readonly first_name: string;
  readonly last_name: string;
  readonly nick_name: string;
  readonly email: string;
  readonly password: string;
  readonly phone_number: string;
  readonly description: string;
  readonly position: string;
  readonly role: Role;
}
