import { AuthGuard } from '@nestjs/passport';
import { AuthStrategies } from 'src/auth/enums';

export class RefreshTokenGuard extends AuthGuard(AuthStrategies.JWT_REFRESH) {}
