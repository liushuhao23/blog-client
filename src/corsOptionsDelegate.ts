/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-29 23:54:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-30 11:32:15
 */
import { Request } from 'express';
//设置允许访问的域名
const allowlist = ['http://localhost:3002'];
const corsOptionsDelegate = (req: Request, callback) => {
  let corsOptions = {};
  console.log("req.header('Origin')", req.header('Origin'));
  corsOptions = { origin: req.header('Origin'), credentials: true };
  // if (allowlist.indexOf(req.header('Origin')) !== -1) {
  //   console.log("req.header('Origin')11111", req.header('Origin'));
  //   corsOptions = { origin: req.header('Origin'), credentials: true };
  // } else {
  //   corsOptions = { origin: false }; // disable CORS for this request
  // }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

export default corsOptionsDelegate;
