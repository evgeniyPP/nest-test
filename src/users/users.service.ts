import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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
    user.roles = [role];
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.findAll({ include: { all: true } });
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(userId: number, dto: AddRoleDto): Promise<User> {
    const user = await this.userRepo.findByPk(userId, { include: ['roles'] });
    const role = await this.rolesService.findOne(dto.role);

    if (!user || !role) {
      throw new NotFoundException('User or role was not found');
    }

    await user.$add('role', role.id);
    return user;
  }

  async ban(userId: number, dto: BanUserDto): Promise<User> {
    const user = await this.userRepo.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
