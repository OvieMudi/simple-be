import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { AuthStrategies } from '../enums/auth-strategies.enum';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.JWT_REFRESH,
) {
  constructor(private readonly configService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: any): Record<string, any> {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
