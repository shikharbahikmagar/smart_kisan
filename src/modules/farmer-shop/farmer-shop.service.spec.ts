import { Test, TestingModule } from '@nestjs/testing';
import { FarmerShopService } from './farmer-shop.service';

describe('FarmerShopService', () => {
  let service: FarmerShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmerShopService],
    }).compile();

    service = module.get<FarmerShopService>(FarmerShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
