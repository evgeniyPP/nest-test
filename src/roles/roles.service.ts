import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  readonly defaultRole = 'USER';

  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    return await this.roleRepo.create(dto);
  }

  async findOne(value: string): Promise<Role> {
    return await this.roleRepo.findOne({ where: { value } });
  }
}
