/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-07 23:09:57
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-09 14:00:37
 */
import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  password: string;
  id: string;
  createTime: string;
}
