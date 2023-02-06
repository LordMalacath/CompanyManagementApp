import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from '../companies/companies.module';
import { UserModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { SequelizeConfigService } from '../../config/sequilizeConfig.service';
import { databaseConfig } from '../../config/configuration';
import { AuthModule } from '../auth/auth.module';
import { BodyParserMiddleware } from 'src/common/middleware/body-parser';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    CompanyModule,
    UserModule,
    AuthModule,
    TokenModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyParserMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.POST },
        { path: '*', method: RequestMethod.PATCH },
      );
  }
}
