/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-08 14:08:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-18 10:27:09
 */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisCacheModule } from 'src/database/redisdb/redis-cache.module';

@Module({
  imports: [UserModule, AuthModule, RedisCacheModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
