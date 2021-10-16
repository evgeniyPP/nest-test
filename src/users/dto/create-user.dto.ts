import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.com', description: 'User email' })
  @IsEmail({}, { message: 'Must be a valid email' })
  @IsString({ message: 'Must be a string' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'User password' })
  @Length(4, 16, { message: 'Must be between 4 and 16 characters' })
  @IsString({ message: 'Must be a string' })
  readonly password: string;
}
