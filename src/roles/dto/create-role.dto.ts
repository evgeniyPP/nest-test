import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role value' })
  readonly value: string;

  @ApiProperty({ example: 'Full access', description: 'Role description' })
  readonly description: string;
}
