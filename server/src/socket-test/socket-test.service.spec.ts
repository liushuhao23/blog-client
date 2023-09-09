/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-05 13:48:16
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-05 13:48:54
 */
import { Test, TestingModule } from '@nestjs/testing';
import { SocketTestService } from './socket-test.service';

describe('SocketTestService', () => {
  let service: SocketTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketTestService],
    }).compile();

    service = module.get<SocketTestService>(SocketTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
