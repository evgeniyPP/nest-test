import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepo.create(dto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.findAll();
  }
}
