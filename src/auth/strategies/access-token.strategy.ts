import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { AuthStrategies } from '../enums/auth-strategies.enum';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.JWT,
) {
  constructor(private readonly configService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  public validate(payload: any): any {
    return payload;
  }
}
