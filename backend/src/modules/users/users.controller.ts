import {
  Body,
  Controller,
  Patch,
  UseGuards,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';
import { User } from './models/user.model';
import { EditUser } from './dto/edit-user.dto';
import { UserService } from './users.service';
import Role from './models/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editUser(
    @Body() editUser: EditUser,
    @Param('id') id: string,
  ): Promise<EditUser> {
    await this.userService.update(id, editUser);
    return editUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}
