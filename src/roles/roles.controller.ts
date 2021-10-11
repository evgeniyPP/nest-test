import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Creates a new role' })
  @ApiResponse({ status: 200, type: Role })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @ApiOperation({
    summary: 'Returns a role by value',
  })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/:value')
  findOne(@Param('value') value: string): Promise<Role> {
    return this.rolesService.findOne(value);
  }
}
