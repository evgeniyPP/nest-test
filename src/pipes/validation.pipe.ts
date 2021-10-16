import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (!errors.length) {
      return value;
    }

    const messages = errors.reduce((acc, { property, constraints }) => {
      acc[property] = Object.values(constraints);
      return acc;
    }, {});
    throw new ValidationException(messages);
  }
}
