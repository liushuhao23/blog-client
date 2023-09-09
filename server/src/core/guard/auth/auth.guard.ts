/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-04 16:31:31
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-09 16:07:20
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { inspect } from 'util';
import { Reflector } from '@nestjs/core';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return true;
  }
}
