import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/users/users.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Post title', description: 'Post title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Lorem ipsum...', description: 'Post content' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  content: string;

  @ApiProperty({
    example: '50f1d9f6-58d1-47e6-ae10-b083ar8de272.jpg',
    description: 'Post image name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: false,
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
