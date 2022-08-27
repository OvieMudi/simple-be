import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repo/user.repository';
import { User, UserSchema } from './repo';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../auth/strategies';
import { ConfigurationModule } from 'src/infra/configuration/configuration.module';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({}),
    ConfigurationModule,
  ],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    AccessTokenStrategy,
    ConfigurationService,
    RefreshTokenStrategy,
    ConfigService,
  ],
  controllers: [UserController, AuthController],
})
export class UserModule {}
