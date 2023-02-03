import {
  Get,
  Controller,
  Param,
  Body,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  HttpCode,
  Header,
  Post,
  Patch,
  Delete,
} from '@nestjs/common/decorators';
import { CompanyService } from './companies.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';
import { EditCompany } from './dto/edit-company.dto';
import { CreateCompany } from './dto/create-company.dto';
import { Company } from './models/company.model';
import Role from '../users/models/role.enum';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllCompaniesAdmin(): Promise<Company[]> {
    return this.companyService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCompanies(@Req() request): Promise<Company[]> {
    const { id } = request.user;
    return this.companyService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneCompany(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createCompany(
    @Body() createCompany: CreateCompany,
    @Req() request,
  ): Promise<Company> {
    const user = request.user;
    return this.companyService.create(user, createCompany);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editCompany(
    @Body() editCompany: EditCompany,
    @Param('id') id: string,
  ): Promise<[affectedCount: number, affectedRows: Company[]]> {
    return this.companyService.update(id, editCompany);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCompany(@Param('id') id: string): Promise<boolean> {
    return this.companyService.remove(id);
  }
}
