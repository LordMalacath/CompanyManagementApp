import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../../modules/users/users.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from 'src/strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
})
export class AuthModule {}
