import { HttpException, BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { AppError } from 'src/common/constants/errors';
import { CreateUser } from 'src/modules/users/dto/create-user.dto';
import { UserService } from 'src/modules/users/users.service';
import { LoginUser } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponce } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(createUser: CreateUser): Promise<AuthUserResponce> {
    try {
      const existUser = await this.userService.findUserByEmail(
        createUser.email,
      );
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      await this.userService.create(createUser);
      const user = await this.userService.publicUser(createUser.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async loginUser(loginUser: LoginUser): Promise<AuthUserResponce> {
    try {
      const existUser = await this.userService.findUserByEmail(loginUser.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      const validatePassword = await bcrypt.compare(
        loginUser.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
      const user = await this.userService.publicUser(loginUser.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
