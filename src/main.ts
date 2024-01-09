import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

function enableSwagger(
  app: INestApplication<any>,
  globalPrefix: string,
  folderSwagger: string,
) {
  const config = new DocumentBuilder()
    .setTitle(globalPrefix)
    .setDescription(
      process.env.APP_DESCRIPTION || 'exchange-rate-calculator project',
    )
    .setVersion(process.env.APP_VERSION || '1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(`${globalPrefix}/${folderSwagger}`, app, document);
}

async function bootstrap() {
  const globalPrefix = process.env.APP_PREFIX || 'exchange-rate-calculator';
  const folderSwagger = process.env.APP_SWAGGER || 'docs';
  const port = process.env.PORT || 3000;
  const logger = new Logger();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.setGlobalPrefix(globalPrefix);

  enableSwagger(app, globalPrefix, folderSwagger);

  await app.listen(3000, '0.0.0.0');

  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  logger.log(
    `🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/${folderSwagger}`,
  );
}
bootstrap();
