import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeArticlesController } from './knowledge_articles.controller';
import { KnowledgeArticlesService } from './knowledge_articles.service';

describe('KnowledgeArticlesController', () => {
  let controller: KnowledgeArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeArticlesController],
      providers: [KnowledgeArticlesService],
    }).compile();

    controller = module.get<KnowledgeArticlesController>(KnowledgeArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
