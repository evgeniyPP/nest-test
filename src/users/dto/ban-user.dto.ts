import { IsString } from 'class-validator';

export class BanUserDto {
  @IsString({ message: 'Must be a string' })
  readonly banReason: string;
}
