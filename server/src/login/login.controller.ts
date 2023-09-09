/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-08 14:08:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-28 17:16:07
 */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RedisCacheService } from 'src/database/redisdb/redis-cache.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private userService: UserService,
    private authService: AuthService,
    private redisCacheService: RedisCacheService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async Login(@Body() body) {
    return this.authService.login(body);
  }
}
