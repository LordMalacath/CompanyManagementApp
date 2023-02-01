import { IsNotEmpty } from 'class-validator';

export class EditCompany {
  @IsNotEmpty()
  readonly name: string;
  readonly address: string;
  readonly service_of_activity: string;
  readonly number_of_employees: number;
  readonly type: string;
}
