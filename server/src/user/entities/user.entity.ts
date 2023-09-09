/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-04 09:09:19
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-25 15:13:46
 */
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  username: string;
  createtTime: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
