import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from 'apps/gateway/src/gateway/gateway.controller';
import { GatewayService } from 'apps/gateway/src/gateway/gateway.service';

describe('GatewayController', () => {
  let gatewayController: GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [GatewayService],
    }).compile();

    gatewayController = app.get<GatewayController>(GatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewayController.getHello()).toBe('Hello World!');
    });
  });
});
