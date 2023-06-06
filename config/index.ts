/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-06 22:58:38
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-07 17:16:55
 */
const envFilePath: string[] = [`${process.cwd()}/config/.env.development`];
process.env.NODE_ENV === 'mock' &&
  envFilePath.unshift(`${process.cwd()}/config/.env.mock`);
process.env.NODE_ENV === 'prod' &&
  envFilePath.unshift(`${process.cwd()}/config/.env.prod`);

export default envFilePath;
