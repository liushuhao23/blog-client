/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-06 17:16:36
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-06 18:28:59
 */
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
