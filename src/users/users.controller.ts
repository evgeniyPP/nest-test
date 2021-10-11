import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
}
