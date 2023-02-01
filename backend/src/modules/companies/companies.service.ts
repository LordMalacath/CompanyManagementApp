import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EditCompany } from './dto/edit-company.dto';
import { CreateCompany } from './dto/create-company.dto';
import { Company } from './models/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  async findAllAdmin(): Promise<Company[]> {
    return this.companyModel.findAll();
  }

  async findAll(userId: number): Promise<Company[]> {
    try {
      return this.companyModel.findAll({
        order: [
          ['name', 'ASC'],
          ['service_of_activity', 'ASC'],
        ],
        where: {
          user: userId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: string): Promise<Company> {
    try {
      return this.companyModel.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  create(user, CreateCompany: CreateCompany): Promise<Company> {
    try {
      const company = new Company();

      company.user = user.id;
      company.name = CreateCompany.name;
      company.address = CreateCompany.address;
      company.service_of_activity = CreateCompany.service_of_activity;
      company.number_of_employees = CreateCompany.number_of_employees;
      company.type = CreateCompany.type;

      return company.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  update(
    id: string,
    editCompany: EditCompany,
  ): Promise<[affectedCount: number, affectedRows: Company[]]> {
    try {
      return this.companyModel.update(
        { ...editCompany },
        {
          where: {
            id,
          },
          returning: true,
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const company = await this.findOne(id);
      await company.destroy();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
