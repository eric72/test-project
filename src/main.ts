import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { fastifyHelmet } from '@fastify/helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as fastifyRateLimit from 'fastify-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.register(fastifyRateLimit, {
    max: 1000,
    timeWindow: '1 minute'
  });

  const options = new DocumentBuilder()
    .setTitle('Projet PB')
    .setDescription('Projet PB API Documentation')
    .setVersion('1.0')
    .addTag('Projet PB')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  // app.use(helmet());
  // app.use(session({ secret: 'eristoff le boss' }));
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
