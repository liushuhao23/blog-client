/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-07 23:12:26
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-25 11:54:10
 */

// 新建用户
export class CreateUserDTO {
  readonly username: string;
  readonly password: string;
  readonly id: string;
  readonly createTime: string;
}

// 编辑用户
export class EditUserDTO {
  readonly username: string;
  readonly password: string;
}
