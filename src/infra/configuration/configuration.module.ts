import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigurationService } from './configuration.service';

@Module({
  exports: [ConfigurationService],
  providers: [ConfigurationService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: configurationService.databaseUrl,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
  ],
})
export class ConfigurationModule {}
