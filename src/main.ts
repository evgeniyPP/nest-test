import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const configureSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Test NestJS Backend')
    .setDescription('REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
};

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
  });
}
bootstrap();
