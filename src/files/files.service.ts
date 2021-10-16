import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${uuid()}.${this.getFileExtension(file.originalname)}`;
      const filePath = resolve(__dirname, '..', 'static');

      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }

      writeFileSync(join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error while writing file');
    }
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop();
  }
}
