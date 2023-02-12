import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express'
import path from 'path';

require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(path.join(__dirname, 'views'));
  // app.setBaseViewsDir(path.join(__dirname, 'views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
