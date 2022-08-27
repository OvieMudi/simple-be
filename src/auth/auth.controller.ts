import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { AuthStrategies } from './enums/auth-strategies.enum';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerDTO: RegisterDTO): Promise<any> {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDTO: LoginDTO): Promise<any> {
    return this.authService.login(loginDTO);
  }

  @Post('refresh')
  @UseGuards(AuthGuard(AuthStrategies.JWT_REFRESH))
  @HttpCode(HttpStatus.OK)
  public async refresh(@Req() req: Request): Promise<any> {
    return this.authService.refresh(req.user);
  }

  @Post('logout')
  @UseGuards(AuthGuard(AuthStrategies.JWT))
  @HttpCode(HttpStatus.OK)
  public async logout(@Req() req: Request): Promise<any> {
    return this.authService.logout(req.user);
  }
}
