import { IsString } from 'class-validator';
import Role from '../../users/models/role.enum';

class UserResponce {
  @IsString()
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  password: string;
  description: string;
  position: string;
  phone_number: string;
  role: Role;
}

export class AuthUserResponce {
  user: UserResponce;

  @IsString()
  token: string;
}
