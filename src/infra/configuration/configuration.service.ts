import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  private _databaseUrl: string;
  private _jwtSecret: string;
  private _jwtRefreshSecret: string;

  constructor(private readonly _configService: ConfigService) {
    this._databaseUrl = this.getVariableFromEnv('DATABASE_URL');
    this._jwtSecret = this.getVariableFromEnv('JWT_SECRET');
    this._jwtRefreshSecret = this.getVariableFromEnv('JWT_REFRESH_SECRET');
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

  private getVariableFromEnv(variableName: string): string {
    const envVariable = this._configService.get<string>(variableName);

    if (!envVariable) {
      throw new Error(`${variableName} is not set`);
    }

    return envVariable;
  }
}
