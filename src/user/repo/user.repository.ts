import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
    return this.userModel.create(user);
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
