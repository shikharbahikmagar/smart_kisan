import { Test, TestingModule } from '@nestjs/testing';
import { FarmerShopController } from './farmer-shop.controller';
import { FarmerShopService } from './farmer-shop.service';

describe('FarmerShopController', () => {
  let controller: FarmerShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerShopController],
      providers: [FarmerShopService],
    }).compile();

    controller = module.get<FarmerShopController>(FarmerShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
