import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FilesModule } from 'src/files/files.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from 'src/users/users.model';
import { Post } from './posts.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Post, User]), FilesModule, AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
