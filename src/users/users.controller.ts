import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermittedRoles } from 'src/decorators/permitted-roles.decorator';
import { Roles } from 'src/roles/roles';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @PermittedRoles(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Returns all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Returns a user by email' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/:email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @ApiOperation({ summary: 'Set a role to a user' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @PermittedRoles(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:id/role')
  addRole(@Param('id') userId: number, @Body() dto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(userId, dto);
  }

  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @PermittedRoles(Roles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:id/ban')
  ban(@Param('id') userId: number, @Body() dto: BanUserDto): Promise<User> {
    return this.usersService.ban(userId, dto);
  }
}
