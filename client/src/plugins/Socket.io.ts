/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-06 19:47:06
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-06 19:47:12
 */
// Socket.io.ts

import { io } from "socket.io-client";

export default {
  install: (app: any, { connection, options }: any) => {
    const socket = io(connection, options);
    app.config.globalProperties.$socket = socket;
    app.provide("socket", socket);
  },
};