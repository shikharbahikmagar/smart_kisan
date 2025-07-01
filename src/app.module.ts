import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FarmerShopModule } from './modules/farmer-shop/farmer-shop.module';
import { ExpertModule } from './modules/expert/expert.module';
import appConfig from './config/app.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CartsModule } from './modules/carts/carts.module';
import { NewsModule } from './modules/news/news.module';
import { NewsCategoryModule } from './modules/news_category/news_category.module';
import { KnowledgeArticlesModule } from './modules/knowledge_articles/knowledge_articles.module';
import { NoticeModule } from './modules/notice/notice.module';
import { SlidersModule } from './sliders/sliders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // ❗️Disable this in production
      }),
    }),

    UserModule,
    CloudinaryModule,
    FarmerShopModule,
    ExpertModule,
    CategoryModule,
    ProductModule,
    CartsModule,
    NewsModule,
    NewsCategoryModule,
    KnowledgeArticlesModule,
    NoticeModule,
    SlidersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
