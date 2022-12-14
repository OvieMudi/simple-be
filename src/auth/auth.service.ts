import {
  UnauthorizedException,
  Injectable,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { BinaryLike, createHash } from 'crypto';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegisterDTO } from './dto';
import { ConfigurationService } from 'src/infra/configuration/configuration.service';
import { AuthMessages } from './enums';
import {
  ISuccessResponse,
  ResponseFormatter,
} from 'src/common/utils/ResponseFormatter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigurationService,
  ) {}

  public async register(registerDTO: RegisterDTO): Promise<ISuccessResponse> {
    try {
      const password = await this.hashData(registerDTO.password);

      const newUser = await this.userService.createUser({
        email: registerDTO.email,
        username: registerDTO.username,
        password,
      });

      const tokens = await this.signToken(newUser.id, newUser.email);

      await this.updateRefreshToken(newUser.id, tokens.refreshToken);

      return ResponseFormatter.success({
        tokens,
        user: newUser,
      });
    } catch (error) {
      if (error.name === 'conflict') throw new ConflictException(error.message);
      throw error;
    }
  }

  public async login(loginDTO: LoginDTO): Promise<ISuccessResponse> {
    const user = await this.userService.getUserByEmail(loginDTO.email);

    const isValidCredentials = await this.isValidCredentials(
      loginDTO.password,
      user?.password,
    );

    if (!isValidCredentials) {
      throw new UnauthorizedException(AuthMessages.INVALID_CREDENTIALS);
    }

    const tokens = await this.signToken(user.id, user.email);

    await this.updateLoginDetails(user.id, tokens.refreshToken);

    return ResponseFormatter.success({
      tokens,
      user,
    });
  }

  public async refresh(
    authData: Record<string, any>,
  ): Promise<ISuccessResponse> {
    const user = await this.userService.getUserById(authData?.userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException(AuthMessages.FORBIDDEN);
    }

    const isValidRefreshToken =
      this.createMd5Hash(authData.refreshToken) === user.refreshToken;

    if (!isValidRefreshToken) {
      throw new ForbiddenException(AuthMessages.FORBIDDEN);
    }

    const tokens = await this.signToken(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return ResponseFormatter.success(tokens);
  }

  public async logout(authData: Record<string, any>): Promise<void> {
    if (!authData.userId) {
      throw new ForbiddenException(AuthMessages.FORBIDDEN);
    }

    return this.handleLogout(authData.userId);
  }

  private async isValidCredentials(
    password: string,
    hashedPassword = '',
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  private hashData(input: string): Promise<string> {
    return hash(input, 10);
  }

  private createMd5Hash(input: string): string {
    return createHash('md5').update(input).digest('hex');
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userService.updateUser(userId, {
      refreshToken: this.createMd5Hash(refreshToken),
    });
  }

  private async updateLoginDetails(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userService.updateUser(userId, {
      refreshToken: this.createMd5Hash(refreshToken),
      lastLoggedInTime: new Date(),
    });
  }

  private async handleLogout(userId: string): Promise<void> {
    await this.userService.updateUser(userId, {
      refreshToken: null,
    });
  }

  public async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          expiresIn: 15 * 60,
          secret: this.configService.jwtSecret,
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          expiresIn: '7d',
          secret: this.configService.jwtRefreshSecret,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
