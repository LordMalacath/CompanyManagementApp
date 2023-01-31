import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';
import { Company } from 'src/modules/companies/models/company.model';
import Role from './role.enum';

@Table
export class User extends Model {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  nick_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phone_number: string;

  @Column
  description: string;

  @Column
  position: string;

  @Column(
    DataType.ENUM({
      values: Object.values(Role),
    }),
  )
  role: Role;

  @HasMany(() => Company, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  company: Company[];
}
