import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Returns all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
