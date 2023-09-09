/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-03 22:18:20
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-06 16:44:47
 */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { RedisCacheService } from 'src/database/redisdb/redis-cache.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private userService: UserService, // private redisCacheService: RedisCacheService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Post('logout')
  // @UseGuards(AuthGuard('jwt'))
  // async singout(@Body() body) {
  //   const UserInfo = await this.userService.findOne('', body.userId);
  //   if (UserInfo) {
  //     await this.redisCacheService.cacheDelet(UserInfo.username);
  //   } else {
  //     throw new HttpException('没有此用户', HttpStatus.FORBIDDEN);
  //   }
  //   return {};
  // }
}
