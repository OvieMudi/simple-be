import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDTO } from './dto';
import { User } from './repo';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  public async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.updateUser(id, payload);
  }
}
