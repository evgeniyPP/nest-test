import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from 'src/proxies/user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
