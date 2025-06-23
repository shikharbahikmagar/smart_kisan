import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeArticlesService } from './knowledge_articles.service';

describe('KnowledgeArticlesService', () => {
  let service: KnowledgeArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeArticlesService],
    }).compile();

    service = module.get<KnowledgeArticlesService>(KnowledgeArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
