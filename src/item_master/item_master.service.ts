import { Injectable } from '@nestjs/common';
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
  async update(uid: string | number, updateItemMasterDto: UpdateItemMasterDto) {
    await this.itemMasterRepo.update(
      { uid: uid.toString() },
      updateItemMasterDto,
    );
    return this.findOne(uid);
  }

  // Remove item
  async remove(uid: string | number) {
    await this.itemMasterRepo.delete({ uid: uid.toString() });
    return { deleted: true };
  }
}
