import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Post title', description: 'Post title' })
  @IsString({ message: 'Must be a string' })
  readonly title: string;

  @ApiProperty({ example: 'Lorem Ipsum...', description: 'Post content' })
  @IsString({ message: 'Must be a string' })
  readonly content: string;

  @ApiProperty({ example: null, description: 'Post image' })
  readonly image: Express.Multer.File;
}
