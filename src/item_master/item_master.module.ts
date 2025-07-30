import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemMaster } from '../entities/entities/ItemMaster';
import { ItemMasterService } from './item_master.service';
import { ItemMasterController } from './item_master.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemMaster])], // <<< สำคัญ!
  controllers: [ItemMasterController],
  providers: [ItemMasterService],
  exports: [TypeOrmModule], // <<< เผื่อโมดูลอื่นจะใช้ Entity นี้
})
export class ItemMasterModule {}
