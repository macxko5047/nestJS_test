import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemMasterService } from './item_master.service';
import { CreateItemMasterDto } from './dto/create-item_master.dto';
import { UpdateItemMasterDto } from './dto/update-item_master.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('api-key') // 'api-key' ตรงกับชื่อที่ตั้งใน main.ts
@Controller('item-master')
export class ItemMasterController {
  constructor(private readonly itemMasterService: ItemMasterService) {}

  @Post()
  create(@Body() createItemMasterDto: CreateItemMasterDto) {
    return this.itemMasterService.create(createItemMasterDto);
  }

  @Get()
  findAll() {
    return this.itemMasterService.findItemAll();
  }
  // ตัวอย่าง endpoint ที่ "ไม่ถูก limit"
  // @Get('no-limit')
  // @SkipThrottle()
  // noLimit() {
  //   return 'No limit here!';
  // }

  @Get('by-item_code/:item_code')
  @SkipThrottle() // ไม่ถูกจำกัด rate limit
  findByItemCode(@Param('item_code') item_code: string) {
    return this.itemMasterService.findByItemCode(item_code);
  }

  // แก้ไขข้อมูล
  @Patch(':uid')
  update(
    @Param('uid') uid: string,
    @Body() updateItemMasterDto: UpdateItemMasterDto,
  ) {
    return this.itemMasterService.update(uid, updateItemMasterDto); // id ไม่ต้อง +id
  }

  // ลบข้อมูล
  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.itemMasterService.remove(uid); // id ไม่ต้อง +id
  }
}
