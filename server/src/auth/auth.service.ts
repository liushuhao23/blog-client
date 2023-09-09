/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-10 15:08:16
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-25 16:07:22
 */
import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { getProcess } from 'src/core/utils';
import { RedisCacheService } from 'src/database/redisdb/redis-cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const info = {
      data: {},
      success: false,
      message: '',
      code: 200,
    };
    if (user) {
      const loginFlag = compareSync(pass, user.password);
      if (loginFlag) {
        const { password, ...result } = user;
        info.data = result;
        info.success = true;
      } else {
        info.success = false;
        info.code = 401;
        info.message = '账号密码错误';
      }
    } else {
      info.code = 403;
      info.success = false;
      info.message = '该账号没有注册，请注册后登录';
    }
    return info;
  }

  async login(user: any) {
    const payload = { username: user.username };
    const assess = this.jwtService.sign(payload);

    this.redisCacheService.cacheSet(payload.username, assess, 1200);
    const UserInfo = await this.userService.findOne(user.username);
    const target = JSON.parse(JSON.stringify(UserInfo));
    Reflect.deleteProperty(target, 'password');
    return JSON.parse(
      JSON.stringify({
        url: getProcess('fronturl'),
        access_token: this.jwtService.sign(payload), //返回token
        userInfo: target,
      }),
    );
  }
}
