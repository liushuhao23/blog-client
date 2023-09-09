/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-03 22:26:33
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-08 15:55:26
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userSchema } from './schemas/user.schema'; //
import { MongooseModule } from '@nestjs/mongoose';

const UserTable = MongooseModule.forFeature([
  { name: 'users', schema: userSchema },
]);

@Module({
  imports: [UserTable],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
