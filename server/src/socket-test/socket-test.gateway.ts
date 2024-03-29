/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-05 13:48:16
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-09 23:27:02
 */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketTestService } from './socket-test.service';
import { CreateSocketTestDto } from './dto/create-socket-test.dto';
import { UpdateSocketTestDto } from './dto/update-socket-test.dto';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as url from 'url';

@WebSocketGateway(8000, { cors: true, maxHttpBufferSize: '1e8' })
export class SocketTestGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly socketTestService: SocketTestService) {}

  private roomTimers: { [roomName: string]: NodeJS.Timeout } = {};

  handleConnection(client: any) {
    console.log('有人链接了' + client.id);
  }

  @SubscribeMessage('createSocketTest')
  create(@MessageBody() createSocketTestDto: CreateSocketTestDto) {
    return this.socketTestService.create(createSocketTestDto);
  }

  @SubscribeMessage('findAllSocketTest')
  findAll() {
    return this.socketTestService.findAll();
  }

  @SubscribeMessage('findOneSocketTest')
  findOne(@MessageBody() id: number) {
    return this.socketTestService.findOne(id);
  }

  @SubscribeMessage('updateSocketTest')
  update(@MessageBody() updateSocketTestDto: UpdateSocketTestDto) {
    return this.socketTestService.update(
      updateSocketTestDto.id,
      updateSocketTestDto,
    );
  }

  @SubscribeMessage('removeSocketTest')
  remove(@MessageBody() id: number) {
    return this.socketTestService.remove(id);
  }

  //简单确认信息示例
  @SubscribeMessage('socketTest')
  socketTest(@ConnectedSocket() client: Socket, payload: any) {
    // console.log('输出payload', payload);
    // console.log('输出client.request.url', client.request.url);
    const roomid = url.parse(client.request.url, true).query.roomid;
    console.log('输出', url.parse(client.request.url, true));
    // Logger.log('客户端发送的数据：' + JSON.stringify(data));
    return {
      msg1: '测试1',
      msg2: '测试2',
    };
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { id } = data;
    console.log('输出id', id);
    client.join(id);
    console.log('输出clientsCount', this.server.engine.clientsCount);
    // client.to(id).emit('joinRoom', `你已经连接了${id}房间`);
  }

  @SubscribeMessage('sendMessage')
  senMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { id, message } = data;
    console.log('输出id', id);
    client.to(id).emit('message', message);
    // client.to(id).emit('joinRoom', `你已经连接了${id}房间`);
  }

  //转发示例
  @SubscribeMessage('socketTest_Event')
  socketTest_Event(@MessageBody() data: any) {
    Logger.log('客户端发送的数据：' + JSON.stringify(data));
    return {
      event: 'socketTest2',
      data,
    };
  }

  // 广播示例
  @SubscribeMessage('socketTest_Broadcast')
  socketTest_Broadcast(
    @MessageBody() data: any,
    @ConnectedSocket() clinet: Socket,
  ) {
    clinet.broadcast.emit('socketTest3', data);
  }
}
