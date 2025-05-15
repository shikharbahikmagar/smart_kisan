import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import JwtConfig from './config/jwt.config'


@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      load: [JwtConfig],
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
        synchronize: true, // ❗️Disable this in production
      }),
    }),

    UserModule,
    CloudinaryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
