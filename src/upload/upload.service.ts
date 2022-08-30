import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigurationService) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.awsAccessKeyId,
        secretAccessKey: this.configService.awsSecretAccessKey,
      },
    });
  }

  async uploadSingleImage(file: Express.Multer.File) {
    const uploadData: S3.PutObjectRequest = {
      Bucket: this.configService.awsS3ImageBucket,
      Key: `${file.filename || file.fieldname}-${Date.now()}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    return this.s3.upload(uploadData).promise();
  }
}
