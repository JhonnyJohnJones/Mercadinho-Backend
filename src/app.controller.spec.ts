import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  describe('testagem', () => {
    it('should return Hello World', () => {
      expect(controller.testagem()).toEqual({
        text: 'Hello World',
      });
    });
  });

  describe('testaEmail', () => {
    it('should return success and email', () => {
      const result = controller.testaEmail({
        email: 'john.doe@test.com',
      });

      expect(result).toEqual({
        success: true,
        email: 'john.doe@test.com',
      });
    });
  });
});
