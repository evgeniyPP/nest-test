import {
  Body,
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './posts.model';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Creates a new post' })
  @ApiResponse({ status: 200, type: PostModel })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() dto: CreatePostDto,
    @Headers('Authorization') authHeader: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<PostModel> {
    console.log(image);
    return this.postsService.create(dto, authHeader, image);
  }
}
