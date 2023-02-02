import { BadRequestException, HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { Company } from '../companies/models/company.model';
import { CreateUser } from './dto/create-user.dto';
import { EditUser } from './dto/edit-user.dto';
import { User } from './models/user.model';
import { Op } from 'sequelize';
import Role from './models/role.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userModel.findAll({ attributes: { exclude: ['password'] } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(CreateUser: CreateUser): Promise<User> {
    try {
      const user = new User();

      user.first_name = CreateUser.first_name;
      user.last_name = CreateUser.last_name;
      user.nick_name = CreateUser.nick_name;
      user.email = CreateUser.email;
      user.password = await this.hashPassword(CreateUser.password);
      user.phone_number = CreateUser.phone_number;
      user.description = CreateUser.description;
      user.position = CreateUser.position;
      user.role = Object.values(Role).includes(CreateUser.role)
        ? CreateUser.role
        : Role.User;

      return user.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, editUser: EditUser): Promise<EditUser> {
    try {
      const anotherUserWithEmail = await this.userModel.findAll({
        where: { email: editUser.email, [Op.not]: [{ id: id }] },
      });
      if (anotherUserWithEmail.length > 0)
        throw new BadRequestException(AppError.EMAIL_TAKEN);
      await this.userModel.update(editUser, { where: { id } });
      return editUser;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async updatePassword(id: string, editUser: EditUser): Promise<boolean> {
    try {
      const password = await this.hashPassword(editUser.password);
      await this.userModel.update({ password }, { where: { id } });
      return true;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.userModel.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return this.userModel.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: Company,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
