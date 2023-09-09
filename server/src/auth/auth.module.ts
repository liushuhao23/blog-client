/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-10 15:08:11
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-25 15:35:31
 */
import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jst.config';
import { JwtStrategy } from './jwt.strategy';
import { RedisCacheModule } from 'src/database/redisdb/redis-cache.module';
@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    RedisCacheModule,
    JwtModule.register(jwtConfig),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
