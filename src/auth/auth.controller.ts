import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: 200 })
  @Post('/login')
  login(@Body() dto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200 })
  @Post('/register')
  register(@Body() dto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.register(dto);
  }
}
