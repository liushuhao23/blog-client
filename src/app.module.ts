/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-04 09:09:19
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-06 16:37:15
 */
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './core/middleware/logger/logger.middleware';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import envFilePath from '../config/index';
import { DBRootModule } from './database/index';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { RedisCacheModule } from './database/redisdb/redis-cache.module';
import { SocketTestModule } from './socket-test/socket-test.module';

@Module({
  imports: [
    // UserModule,
    // ArticleModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath,
    // }),
    // DBRootModule,
    // LoginModule,
    // AuthModule,
    // RedisCacheModule,
    SocketTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
