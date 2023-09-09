/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-07 18:01:30
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-28 17:15:55
 */

import { Injectable } from '@nestjs/common';

// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// 引入数据类型
import { CreateUserDTO, EditUserDTO } from './dto/user.dto';
import { User } from './user.interface';
import { getCurrnetTime, getUUID } from '../core/utils';
import { UserEntity } from './entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcryptjs = require('bcryptjs');

@Injectable()
export class UserService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  /**
   * mongoose 操作数据库是异步的，所以使用 async/await
   */

  // 查找所有用户
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // 查找单个用户 username 和 id 互斥
  async findOne(username: string, id?: string): Promise<User> {
    if (username && id) {
      throw new Error('username 和 id 互斥');
    }
    const params: any = {};
    username && (params.username = username);
    id && (params.id = id);

    const res = await this.userModel.findOne(params);
    return res;
  }

  // 添加单个用户
  async addOne(body: User): Promise<any> {
    body.id = getUUID();
    body.createTime = getCurrnetTime();
    const hashPassword = bcryptjs.hashSync(body.password, 10);
    body.password = hashPassword;
    return await this.userModel.create(body);
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }
}
