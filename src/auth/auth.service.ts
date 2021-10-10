import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async register(dto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.createUser(dto);
    return this.generateToken(user);
  }

  private async validateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOne(dto.email);
    const passwordsMatch = await compare(dto.password, user.password);

    if (!user || !passwordsMatch) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
      });
    }

    return user;
  }

  private async createUser(dto: CreateUserDto): Promise<User> {
    const candidate = await this.usersService.findOne(dto.email);

    if (candidate) {
      throw new BadRequestException({ message: 'Email is already taken' });
    }

    const hashedPassword = await hash(dto.password, 5);

    return await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
  }

  private generateToken(user: User): { token: string } {
    const payload = { id: user.id, email: user.email, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
