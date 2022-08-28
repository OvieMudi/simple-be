import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDTO } from './dto';
import { User } from './repo';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
