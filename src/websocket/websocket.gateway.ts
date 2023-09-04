/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-04 17:33:05
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-04 17:44:34
 */
import { WebSocketGateway } from '@nestjs/websockets';
import { SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BizException } from '../common/biz-exception';
import { ERR_REQ_FIELD_ERROR } from '../common/return-code';

@WebSocketGateway(4000, {
  transports: ['websocket'],
})
export class WebSocketGatewayInstance {
  @SubscribeMessage('hello')
  hello(@MessageBody() reqData: { name: string }) {
    if (!reqData || !reqData.name) {
      throw BizException.create(ERR_REQ_FIELD_ERROR, 'data is empty');
    }
    console.log(JSON.stringify(reqData));
  }
}
