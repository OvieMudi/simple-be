import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './infra/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
