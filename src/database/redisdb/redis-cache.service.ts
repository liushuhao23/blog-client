/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-17 13:58:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-18 11:27:01
 */
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async cacheSet(key: string, value: string, ttl: number) {
    await this.cacheManager.set(key, value, { ttl: ttl } as any);
  }

  async cacheGet(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async cacheDelet(key: string): Promise<any> {
    return this.cacheManager.del(key);
  }
}
