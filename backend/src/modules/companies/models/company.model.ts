import { ForeignKey } from 'sequelize-typescript';
import { Table, Model, Column } from 'sequelize-typescript';
import { User } from 'src/modules/users/models/user.model';

@Table
export class Company extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  service_of_activity: string;

  @Column
  number_of_employees: number;

  @Column
  type: string;
}
