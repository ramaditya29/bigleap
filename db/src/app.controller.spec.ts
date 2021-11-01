import { Test, TestingModule } from '@nestjs/testing';
import { DBController } from './db.controller';
import { DBService } from './db.service';

describe('AppController', () => {
  let appController: DBController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DBController],
      providers: [DBService],
    }).compile();

    appController = app.get<DBController>(DBController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
