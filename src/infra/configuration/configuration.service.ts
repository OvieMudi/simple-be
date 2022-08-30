import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  private _databaseUrl: string;
  private _jwtSecret: string;
  private _jwtRefreshSecret: string;
  private _awsAccessKeyId: string;
  private _awsSecretAccessKey: string;
  private _awsS3ImageBucket: string;

  constructor(private readonly _configService: ConfigService) {
    this._databaseUrl = this.getVariableFromEnv('DATABASE_URL');
    this._jwtSecret = this.getVariableFromEnv('JWT_SECRET');
    this._jwtRefreshSecret = this.getVariableFromEnv('JWT_REFRESH_SECRET');
    this._awsAccessKeyId = this.getVariableFromEnv('AWS_ACCESS_KEY_ID');
    this._awsSecretAccessKey = this.getVariableFromEnv('AWS_SECRET_ACCESS_KEY');
    this._awsS3ImageBucket = this.getVariableFromEnv('AWS_S3_IMAGE_BUCKET');
  }

  get databaseUrl(): string {
    return this._databaseUrl;
  }

  get jwtSecret(): string {
    return this._jwtSecret;
  }

  get jwtRefreshSecret(): string {
    return this._jwtRefreshSecret;
  }

  get awsAccessKeyId(): string {
    return this._awsAccessKeyId;
  }

  get awsSecretAccessKey(): string {
    return this._awsSecretAccessKey;
  }

  get awsS3ImageBucket(): string {
    return this._awsS3ImageBucket;
  }

  private getVariableFromEnv(variableName: string): string {
    const envVariable = this._configService.get<string>(variableName);

    if (!envVariable) {
      throw new Error(`${variableName} is not set`);
    }

    return envVariable;
  }
}
