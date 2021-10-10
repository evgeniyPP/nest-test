import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Creates a new role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @ApiOperation({
    summary: 'Returns a role by value',
  })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:value')
  findOne(@Param('value') value: string): Promise<Role> {
    return this.rolesService.findOne(value);
  }
}
