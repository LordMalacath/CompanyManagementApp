import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyController } from './companies.controller';
import { CompanyService } from './companies.service';
import { Company } from './models/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
