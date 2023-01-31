import { Controller, Post, Body } from '@nestjs/common';
import { CreateUser } from 'src/modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUser } from './dto/login-user.dto';
import { AuthUserResponce } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() createUser: CreateUser): Promise<AuthUserResponce> {
    return this.authService.registerUser(createUser);
  }

  @Post('signin')
  login(@Body() loginUser: LoginUser): Promise<AuthUserResponce> {
    return this.authService.loginUser(loginUser);
  }
}
