import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeCategoryService } from './knowledge_category.service';

describe('KnowledgeCategoryService', () => {
  let service: KnowledgeCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeCategoryService],
    }).compile();

    service = module.get<KnowledgeCategoryService>(KnowledgeCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
