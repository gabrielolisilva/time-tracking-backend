import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IResponse } from './utils/global.interfaces';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Api status', () => {
      const expectedObj: IResponse = {
        msg: 'API working fine!',
        code: 'AS9',
      };

      expect(appController.getApiStatus()).toEqual(expectedObj);
    });
  });
});
