import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'User password' })
  readonly password: string;
}
