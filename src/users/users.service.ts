import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.create(dto);
    const role = await this.rolesService.findOne(this.rolesService.defaultRole);
    await user.$set('roles', [role.id]);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.findAll({ include: { all: true } });
  }
}
