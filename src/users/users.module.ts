import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/proxies/user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
