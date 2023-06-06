/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-10 15:11:45
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-17 23:04:46
 */
import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RedisCacheService } from 'src/database/redisdb/redis-cache.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (user.success) {
      return user;
    } else if (user.code === 403) {
      throw new HttpException(user.message, 403);
    } else if (user.code === 401) {
      throw new HttpException('账号密码错误', 401);
    }
  }
}
