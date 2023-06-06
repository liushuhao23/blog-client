/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-07 15:52:03
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-10 18:10:21
 */
import { MongooseModule } from '@nestjs/mongoose';
import { getProcess } from '../../src/core/utils';
const mongodbUri = getProcess('mongodbUri');

export const DBRootModule = MongooseModule.forRoot(mongodbUri);
