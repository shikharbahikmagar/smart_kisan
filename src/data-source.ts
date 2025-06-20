import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './modules/user/entities/user.entity';
import { FarmerShop } from './modules/farmer-shop/entities/farmer-shop.entity';
import { Expert } from './modules/expert/entities/expert.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, FarmerShop, Expert],       // Use src/*.ts files
  migrations: ['src/database/migrations/*.ts'],  // Use src migrations files
  synchronize: false,
});
