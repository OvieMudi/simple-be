import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CustomError } from 'src/common/utils/CustomError';
import { UpdateUserDTO } from '../dto';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findOne(query: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(query);
  }

  public async find(query: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(query);
  }

  public async create(user: Partial<User>): Promise<User> {
    try {
      return await this.userModel.create(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new CustomError('conflict', 'User with details already exists');
      }
      throw error;
    }
  }

  public async update(
    query: FilterQuery<User>,
    user: UpdateUserDTO,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(query, user, {
      new: true,
      lean: true,
    });
  }
}
