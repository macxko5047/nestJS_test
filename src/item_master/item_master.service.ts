import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemMasterDto } from './dto/create-item_master.dto';
import { UpdateItemMasterDto } from './dto/update-item_master.dto';
import { ItemMaster } from 'src/entities/entities/ItemMaster';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemMasterService {
  constructor(
    @InjectRepository(ItemMaster)
    private readonly itemMasterRepo: Repository<ItemMaster>,
  ) {}

  // Create new item
  create(createItemMasterDto: CreateItemMasterDto) {
    const newItem = this.itemMasterRepo.create(createItemMasterDto);
    return this.itemMasterRepo.save(newItem);
  }

  // Get all items
  async findAll() {
    return await this.itemMasterRepo.find();
  }

  // Get all items with total count
  async findItemAll() {
    const [data, total] = await this.itemMasterRepo.findAndCount();
    return { data, total };
  }

  // Find by item code
  async findByItemCode(item_code: string) {
    return await this.itemMasterRepo.find({ where: { item_code } });
  }

  // Find one by ID
  async findOne(uid: string | number) {
    return await this.itemMasterRepo.findOne({
      where: { uid: uid.toString() },
    });
  }

  // Update item
  async update(uid: string, dto: UpdateItemMasterDto) {
    const item = await this.itemMasterRepo.findOne({ where: { uid } });
    if (!item) {
      throw new NotFoundException(`Item with uid ${uid} not found`);
    }

    // update property ตามที่รับเข้ามา
    Object.assign(item, dto);

    // save กลับเข้าไปใน db
    const updatedItem = await this.itemMasterRepo.save(item);

    return updatedItem;
  }

  // Remove item
  async remove(uid: string | number) {
    const result = await this.itemMasterRepo.delete({ uid: uid.toString() });

    if (result.affected === 0) {
      // ไม่เจอ uid นี้ใน database
      throw new NotFoundException(`Item with uid ${uid} not found`);
    }

    return { deleted: true };
  }
}
