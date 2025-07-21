import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './modules/user/entities/user.entity';
import { FarmerShop } from './modules/farmer-shop/entities/farmer-shop.entity';
import { Expert } from './modules/expert/entities/expert.entity';
import { Category } from './modules/category/entities/category.entity';
import { Product } from './modules/product/entities/product.entity';
import { Cart } from './modules/carts/entities/cart.entity';
import { News } from './modules/news/entities/news.entity';
import { NewsCategory } from './modules/news_category/entities/news_category.entity';
import { KnowledgeArticle } from './modules/knowledge_articles/entities/knowledge_article.entity';
import { Notice } from './modules/notice/entities/notice.entity';
import { Slider } from './modules/sliders/entities/slider.entity';
import { KnowledgeCategory } from './modules/knowledge_category/entities/knowledge_category.entity';
import { Order } from './modules/orders/entities/order.entity';
import { OrderItem } from './modules/order_items/entities/order_item.entity';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, FarmerShop, Expert, Category, Product, Cart, News, NewsCategory, KnowledgeArticle, Notice, Slider, KnowledgeCategory, Order, OrderItem], 
  migrations: ['src/database/migrations/*.ts'], // Use src migrations files
  synchronize: false,
});
