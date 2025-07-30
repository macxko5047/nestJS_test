import { PartialType } from '@nestjs/swagger';
import { CreateItemMasterDto } from './create-item_master.dto';

export class UpdateItemMasterDto extends PartialType(CreateItemMasterDto) {}
