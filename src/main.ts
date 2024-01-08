import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { initializeTracing } from './config/open-telemetry/tracer';

initializeTracing();

function enableSwagger(
  app: INestApplication<any>,
  globalPrefix: string,
  folderSwagger: string,
) {
  const config = new DocumentBuilder()
    .setTitle(globalPrefix)
    .setDescription(
      process.env.APP_DESCRIPTION || 'Auna microservices template project',
    )
    .setVersion(process.env.APP_VERSION || '1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(`${globalPrefix}/${folderSwagger}`, app, document);
}

async function bootstrap() {
  const globalPrefix = process.env.APP_PREFIX || 'template-ms';
  const folderSwagger = process.env.APP_SWAGGER || 'docs';
  const port = process.env.PORT || 3000;
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.setGlobalPrefix(globalPrefix);

  enableSwagger(app, globalPrefix, folderSwagger);

  await app.listen(port);

  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  logger.log(
    `🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/${folderSwagger}`,
  );
}
bootstrap();
