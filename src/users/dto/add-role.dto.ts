import { IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Must be a string' })
  readonly role: string;
}
