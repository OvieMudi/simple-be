import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { ConfigurationModule } from 'src/infra/configuration/configuration.module';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User, UserRepository, UserSchema } from 'src/user/repo';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigurationModule,
    UserModule,
    MongooseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UserService,
    AuthService,
    AccessTokenStrategy,
    ConfigurationService,
    RefreshTokenStrategy,
    ConfigService,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
