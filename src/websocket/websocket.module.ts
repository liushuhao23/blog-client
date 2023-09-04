/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-04 17:36:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-04 17:43:52
 */
import { WebSocketGatewayInstance } from './websocket.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [WebSocketGatewayInstance],
})
export class WebSocketModule {}
