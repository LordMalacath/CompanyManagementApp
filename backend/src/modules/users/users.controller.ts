import {
  Body,
  Controller,
  Patch,
  UseGuards,
  Req,
  Delete,
  Get,
} from '@nestjs/common';
import { request } from 'http';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';
import { User } from './models/user.model';
import { CreateUser } from './dto/create-user.dto';
import { EditUser } from './dto/edit-user.dto';
import { UserService } from './users.service';
import Role from './models/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('create-user')
  // createUser(@Body() createUser: CreateUser) {
  //   return this.userService.create(createUser);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async changeUser(
    @Body() editUser: EditUser,
    @Req() request,
  ): Promise<EditUser> {
    const user = request.user;
    await this.userService.update(user.id, editUser);
    return editUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.remove(user.id);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}
