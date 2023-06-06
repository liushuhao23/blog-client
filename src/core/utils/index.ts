/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-07 17:26:07
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-11 09:18:41
 */
import * as dotenv from 'dotenv';
import envFilePath from '../../../config/index';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
dayjs.locale('zh-cn'); // 使用本地化语言

dotenv.config({ path: envFilePath[0] });
export const getProcess = (name: string) => {
  return process.env[name];
};

/**
 * @description:获取uuid
 * @return {*}
 * @author: liushuhao
 */
export const getUUID = () => {
  return uuid();
};

/**
 * @description:获取当前时间
 * @param {string} format
 * @return {*}
 * @author: liushuhao
 */
export const getCurrnetTime = (format?: string) => {
  let defaultForm = '';
  format ? (defaultForm = format) : (defaultForm = 'YYYY-DD-MM');
  return dayjs().format(defaultForm);
};
