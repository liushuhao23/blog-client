/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-11 10:10:42
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-18 10:40:50
 */

import { getProcess } from 'src/core/utils';

export const jwtConfig = {
  secret: getProcess('jwtSecretOrKey'),
  signOptions: { expiresIn: '4h' },
};
