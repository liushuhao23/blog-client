/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-03 22:18:20
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-06 16:37:06
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import corsOptionsDelegate from './corsOptionsDelegate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptionsDelegate);
  app.setGlobalPrefix('blog/api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(4000);
}
bootstrap();
