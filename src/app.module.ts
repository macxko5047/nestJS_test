import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemMasterModule } from './item_master/item_master.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'your_password',
      database: process.env.POSTGRES_DATABASE || 'test_nest_js',
      autoLoadEntities: true,
      synchronize: false, // Warning: disable in production!
    }),
    ItemMasterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
