import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto';
import { UserRepository } from './repo/user.repository';
import { User } from './repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ _id: id });
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  public async createUser(user: Partial<User>): Promise<User> {
    const newUser: Partial<User> = {
      email: user.email,
      password: user.password,
      username: user.username,
      lastLoggedInTime: new Date(),
      refreshToken: '',
    };
    return await this.userRepository.create(newUser);
  }

  public async updateUser(id: string, user: UpdateUserDTO): Promise<User> {
    return await this.userRepository.update({ _id: id }, user);
  }
}
