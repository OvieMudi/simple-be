import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ConfigurationService, ConfigService],
})
export class UploadModule {}
