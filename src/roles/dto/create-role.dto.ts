import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role value' })
  @IsString({ message: 'Must be a string' })
  readonly value: string;

  @ApiProperty({ example: 'Full access', description: 'Role description' })
  @IsString({ message: 'Must be a string' })
  readonly description: string;
}
