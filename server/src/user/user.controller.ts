/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-03 22:26:33
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-29 23:10:11
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Redirect,
  Delete,
  UseGuards,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../core/decorator/role/roles.decorator';
import { EditUserDTO } from './dto/user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles('admin')
  async addOne(@Body() body: User): Promise<any> {
    const findUser = await this.userService.findOne(body.username);
    if (findUser) {
      throw new HttpException('账号已经存在', 401);
    }
    await this.userService.addOne(body);
    return '';
  }

  @Post('users')
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return {};
    // return await this.userService.findAll();
  }

  @Get('users')
  // @UseGuards(AuthGuard('jwt'))
  async findAllZ() {
    return {};
    // return await this.userService.findAll();
  }

  @Post('userInfo')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Body() body): Promise<UserEntity> {
    const res = await this.userService.findOne('', body.userId);
    return new UserEntity(JSON.parse(JSON.stringify(res)));
  }

  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<UserResponse> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  @Delete(':id')
  remove(@Param('_id') _id: string) {
    return this.userService.deleteOne(_id);
  }
}
