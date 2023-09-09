/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-17 13:57:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-18 11:10:59
 */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module, Global } from '@nestjs/common';
import { getProcess } from 'src/core/utils';

// REDIS_D
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOS'),
        port: configService.get('REDIS_POR'),
        db: configService.get('REDIS_D'), //目标库,
        auth_pass: '', //
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
