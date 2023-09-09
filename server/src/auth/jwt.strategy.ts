/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-11 14:16:16
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-28 17:14:46
 */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConfig } from './jst.config';
import { RedisCacheService } from 'src/database/redisdb/redis-cache.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //使用ExtractJwt.fromAuthHeaderAsBearerToken
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: jwtConfig.secret, //使用密钥解析，可以使用process.env.xxx
    } as StrategyOptions);
  }

  //token验证, payload是super中已经解析好的token信息
  async validate(req, user: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const cacheToken = await this.redisCacheService.cacheGet(
      `${user.username}`,
    );
    if (!cacheToken) {
      throw new UnauthorizedException('token 已过期');
    }
    if (token !== cacheToken) {
      throw new UnauthorizedException('token 已过期');
    }
    const existUser = await this.userService.findOne(user.username);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}
