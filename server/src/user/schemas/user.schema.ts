/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-07 17:38:42
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-08 10:37:57
 */
import { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: false },
  createTime: { type: String, required: false },
});
