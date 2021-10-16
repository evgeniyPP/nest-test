import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AuthService } from 'src/auth/auth.service';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postsRepo: typeof Post,
    private authService: AuthService,
    private filesService: FilesService,
  ) {}

  async create(
    dto: CreatePostDto,
    authHeader: string,
    image: Express.Multer.File,
  ): Promise<Post> {
    const userId = this.authService.getCurrentUser(authHeader)?.id;
    const imageName = await this.filesService.create(image);

    const post = await this.postsRepo.create({
      ...dto,
      userId,
      image: imageName,
    });

    return post;
  }
}
